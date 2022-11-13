import controllers from "../controllers/controller.js";
import { PRODUCT_LIST } from "../admin/list/productList.js";
import defaultProductList from "../admin/list/productList.js";
let productList =
  JSON.parse(localStorage.getItem(PRODUCT_LIST)) ?? defaultProductList;
localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userStatus = JSON.parse(localStorage.getItem(currentUser));
console.log(userStatus.cart);

const addIntoCart = (index) => {
  userStatus.cart = controllers.add(userStatus.cart, index);
  localStorage.setItem(currentUser, JSON.stringify({ ...userStatus }));
};
// render
const render = () => {
  // Paginators
  let current = 1;
  const limit = 3;
  const totalPage = Math.ceil(productList.length / limit);
  const loadItems = () => {
    const start = limit * (current - 1);
    const end = limit * current - 1;
    const newProductList = productList.map((product, index) => {
      if (index >= start && index <= end) {
        return `
        <div>
          <span data-product="${product.id}" class="id">${product.id}<span/>
          <span data-product="${product.id}" class="name">${product.id}<span/>
          <span data-product="${product.id}" class="price">${product.id}<span/>
          <span data-product="${product.id}" class="description">${product.id}<span/>
          <span data-product="${product.id}" class="img">${product.id}<span/>
          <span data-product="${product.id}" class="type">${product.id}<span/>
          <button data-product="${product.id}" class="submit">Submit</button>
          <button data-product="${product.id}" class="button">Delete</button>
        </div>
            `;
      }
    });
    document.querySelector("#app").innerHTML = newProductList.join("");
    const cartList = productList.map((product) => {
      if (userStatus.cart.includes(product.id)) {
        return `
      <div>
        <span data-product="${product.id}" class="id">${product.id}<span/>
        <button data-product="${product.id}" class="button">Delete</button>
      </div>
          `;
      }
    });
    document.querySelector(".cart").innerHTML = cartList.join("");
    // handleEvents
    // add product
    const handleAddProduct = () => {
      const getBtn = document.querySelectorAll(".submit");
      getBtn.forEach((item) => {
        item.onclick = () => {
          addIntoCart(item.dataset.product);
          loadItems();
        };
      });
    };
    handleAddProduct();
    // delete product
    const handleDeleteProduct = () => {};
    handleDeleteProduct();
  };
  loadItems();
  const listPage = () => {
    let pageArr = [];
    for (let index = 1; index < totalPage + 1; index++) {
      pageArr.push(`<li data-key=${index}>${index}</li>`);
    }
    document.querySelector(".listPage").innerHTML = pageArr.join("");
  };
  listPage();
  const pageNumber = () => {
    const pages = document.querySelectorAll("li");
    pages.forEach((page) => {
      page.onclick = () => {
        current = Number(page.innerHTML);
        document.querySelector("li[data-key='1'].active") &&
          document
            .querySelector("li[data-key='1'].active")
            .classList.remove("active");
        page.classList.add("active");
        loadItems();
      };
    });
    document.querySelector("li[data-key='1']").classList.add("active");
  };
  pageNumber();
};
render();

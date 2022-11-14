import controllers from "../controllers/controller.js";
import { PRODUCT_LIST } from "../admin/list/productList.js";
import defaultProductList from "../admin/list/productList.js";
let productList =
  JSON.parse(localStorage.getItem(PRODUCT_LIST)) ?? defaultProductList;
localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userStatus = JSON.parse(localStorage.getItem(currentUser));

const addIntoCart = (product) => {
  const existProduct = userStatus.cart.find((item) => item.id === product.id);
  if (existProduct) {
    userStatus.cart = controllers.update(userStatus.cart, existProduct.id, {
      id: existProduct.id,
      quantity: ++existProduct.quantity,
    });
  } else {
    userStatus.cart = controllers.add(userStatus.cart, product);
  }
  localStorage.setItem(currentUser, JSON.stringify({ ...userStatus }));
};
const removeOutOfCart = (index) => {
  const existProduct = userStatus.cart.find((item) => item.id === index);
  if (existProduct && existProduct.quantity > 1) {
    userStatus.cart = controllers.update(userStatus.cart, index, {
      id: index,
      quantity: --existProduct.quantity,
    });
  } else {
    userStatus.cart = controllers.delete(userStatus.cart, index);
  }
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
        </div>
            `;
      }
    });
    document.querySelector("#app").innerHTML = newProductList.join("");
    const cartList = userStatus.cart.map((product) => {
      if (userStatus) {
        return `
      <div>
        <span data-product="${product.id}" class="id">${product.id}</span>
        <span data-product="${product.id}" class="quantity">${product.quantity}</span>
        <button type="delete" data-product="${product.id}">Delete</button>
      </div>
          `;
      }
    });
    document.querySelector(".cart").innerHTML = cartList.join("");
    // handleEvents
    // add product
    const handleAddIntoCart = () => {
      const getBtn = document.querySelectorAll(".submit");
      getBtn.forEach((item) => {
        item.onclick = () => {
          const getQuantity = document.querySelector(
            `.quantity[data-product="${item.dataset.product}"]`
          );
          if (currentUser == null) {
            alert("Use need to login to buy products");
            return;
          }
          const product = {
            id: item.dataset.product,
            quantity: (getQuantity && getQuantity.innerHTML) || 1,
          };
          addIntoCart(product);
          loadItems();
        };
      });
    };
    handleAddIntoCart();
    // delete product
    const handleRemoveOutOfCart = () => {
      const getBtn = document.querySelectorAll(
        "button[data-product][type=delete]"
      );
      getBtn.forEach((element) => {
        element.onclick = () => {
          const getQuantity = document.querySelector(
            `.quantity[data-product="${element.dataset.product}"]`
          );
          if (
            getQuantity.innerHTML === "1" &&
            !confirm("Bạn có muốn xoá sản phẩm khỏi giỏ hàng")
          )
            return;
          removeOutOfCart(element.dataset.product);
          loadItems();
        };
      });
    };
    handleRemoveOutOfCart();
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

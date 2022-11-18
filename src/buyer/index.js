import controllers from "../controllers/controller.js";
import { PRODUCT_LIST, typeList } from "../admin/list/productList.js";
import { USER_LIST } from "../admin/list/userList.js";
import defaultUserList from "../admin/list/userList.js";
import defaultProductList from "../admin/list/productList.js";
import removeTones from "./removeTones.js";
let productList =
  JSON.parse(localStorage.getItem(PRODUCT_LIST)) ?? defaultProductList;
let userList = JSON.parse(localStorage.getItem(USER_LIST)) ?? defaultUserList;
localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userStatus = JSON.parse(localStorage.getItem(currentUser));
userStatus &&
  !userList.find((item) => item.id === userStatus.id) &&
  localStorage.setItem(USER_LIST, JSON.stringify([...userList, userStatus]));
const updateUserList = () => {
  if (userList.find((item) => item.id === userStatus.id)) {
    userList = controllers.update(userList, userStatus.id, userStatus);
    localStorage.setItem(USER_LIST, JSON.stringify(userList));
  }
};
let filterArray = [];
const setFilter = () => {
  return productList.filter((item) => {
    if (filterArray.length) {
      if (filterArray.includes(item.type)) return item;
    } else {
      return item;
    }
  });
};

const searchFilter = (value = "") => {
  return setFilter().filter(
    (item) =>
      item.name.toLowerCase().includes(value.toLowerCase()) ||
      item.type.toLowerCase().includes(value.toLowerCase()) ||
      item.description.toLowerCase().includes(value.toLowerCase())
  );
};
const addIntoCart = (product) => {
  const existProduct = userStatus.cart.find((item) => item.id === product.id);
  if (existProduct) {
    userStatus.cart = controllers.update(userStatus.cart, existProduct.id, {
      ...existProduct,
      quantity: ++existProduct.quantity,
    });
  } else if (userStatus) {
    userStatus.cart = controllers.add(userStatus.cart, product);
  }
  localStorage.setItem(currentUser, JSON.stringify({ ...userStatus }));
};
const removeOutOfCart = (index) => {
  const existProduct = userStatus.cart.find((item) => item.id === index);
  if (existProduct && existProduct.quantity > 1) {
    userStatus.cart = controllers.update(userStatus.cart, index, {
      ...existProduct,
      quantity: --existProduct.quantity,
    });
  } else {
    userStatus.cart = controllers.delete(userStatus.cart, index);
  }
  localStorage.setItem(currentUser, JSON.stringify({ ...userStatus }));
};
const buyAndGetReceipt = () => {
  userStatus = {
    ...userStatus,
    receipt: [...userStatus.receipt, userStatus.cart],
  };
  userStatus.cart = [];
  localStorage.setItem(currentUser, JSON.stringify({ ...userStatus }));
};
// App
const App = () => {
  const getInputValue = removeTones(
    document.querySelector("input[name=search]").value
  );
  // Paginators
  let current = 1;
  const limit = 8;
  let totalPage = Math.ceil(searchFilter(getInputValue).length / limit);
  const render = () => {
    const start = limit * (current - 1);
    const end = limit * current - 1;
    console.log();
    const productHTML = searchFilter(getInputValue).map((product, index) => {
      //   <div data-product="${product.id}">
      //   <span data-product="${product.id}" class="id">${product.id}</span>
      //   <span data-product="${product.id}" class="name">${product.name}</span>
      //   <span data-product="${product.id}" class="price">${product.price}</span>
      //   <span data-product="${product.id}" class="description">${product.id}</span>
      //   <span data-product="${product.id}" class="img">${product.img}</span>
      //   <span data-product="${product.id}" class="type">${product.type}</span>
      //   <button data-product="${product.id}" class="submit">Submit</button>
      // </div>
      if (index >= start && index <= end) {
        return `
        <div data-product=${product.id} class="card flex-center">
          <img data-product=${product.id} src="${product.img}" alt="" />
          <div  class="show flex-center flex-col">
            <button type="add" data-product=${product.id}>Add to cart</button>
            <button data-product=${product.id}>View detail</button>
          </div>
        </div>
            `;
      }
    });
    document.querySelector(".product").innerHTML = productHTML.join("");
    const cartHTML =
      currentUser &&
      userStatus.cart.map((product) => {
        return `
      <div>
        <span data-product="${product.id}" class="id">${product.id}</span>
        <span data-product="${product.id}" class="quantity">${product.quantity}</span>
        <button type="delete" data-product="${product.id}">Delete</button>
      </div>
          `;
      });
    // document.querySelector(".cart").innerHTML =
    //   currentUser && cartHTML.join("");

    const typeHTML = typeList.map((type) => {
      if (filterArray.includes(type)) {
        return `
        <li data-type="${type}" class="active">${type}</li>
        `;
      } else {
        return `
        <li data-type="${type}" class="">${type}</li>
        `;
      }
    });
    document.querySelector("menu ul").innerHTML = typeHTML.join("");
    // handleEvents
    // add product
    const handleAddIntoCart = () => {
      const getBtn = document.querySelectorAll("button[type=add]");
      getBtn.forEach((item) => {
        item.onclick = () => {
          const getQuantity = document.querySelector(
            `.quantity[data-product="${item.dataset.product}"]`
          );
          if (JSON.parse(localStorage.getItem("currentUser")) === null) {
            alert("Use need to login to buy products");
            document.querySelector("#Form").click();
            return;
          }
          const product = {
            id: item.dataset.product,
            quantity: (getQuantity && getQuantity.innerHTML) || 1,
            ...productList[item.dataset.product],
          };
          addIntoCart(product);
          render();
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
          updateUserList();
          render();
        };
      });
    };
    handleRemoveOutOfCart();
    const handleBuy = () => {
      const getBtn = document.querySelector(".buy");
      getBtn.onclick = () => {
        if (currentUser && userStatus.cart.length > 0) {
          buyAndGetReceipt();
          updateUserList();
          render();
        }
      };
    };
    // handleBuy();
    const handleFilter = () => {
      const typeElement = document.querySelectorAll("menu ul li");
      typeElement.forEach((type) => {
        type.onclick = () => {
          if (filterArray.includes(type.dataset.type)) {
            filterArray = filterArray.filter(
              (item) => item != type.dataset.type
            );
          } else {
            filterArray.push(type.dataset.type);
          }
          setFilter(filterArray);
          searchFilter();
          App();
        };
      });
    };
    handleFilter();
  };
  render();
  const listPage = () => {
    let pageArr = [];
    for (let index = 1; index < totalPage + 1; index++) {
      pageArr.push(`<li data-key=${index}>${index}</li>`);
    }
    document.querySelector("section ul").innerHTML = pageArr.join("");
  };
  listPage();
  const pageNumber = () => {
    const pages = document.querySelectorAll("li[data-key]");
    pages.forEach((page) => {
      page.onclick = () => {
        current = Number(page.innerHTML);
        document
          .querySelector("li[data-key].active")
          .classList.remove("active");
        page.classList.add("active");
        render();
        searchFilter(getInputValue);
      };
    });
    document.querySelector("li[data-key='1']") &&
      document.querySelector("li[data-key='1']").classList.add("active");
  };
  pageNumber();
  const handleSearch = () => {
    const getInput = document.querySelector("input[name=search]");
    getInput.oninput = () => {
      App();
    };
  };
  handleSearch();
  const handleLogOut = () => {
    const getBtn = document.querySelector(".user div");
    getBtn.onclick = () => {
      localStorage.setItem("currentUser", JSON.stringify(null));
      window.location.reload();
    };
  };
  handleLogOut();
};
App();

// Static
currentUser
  ? (document.querySelector(".user").style = "display: block;") &&
    (document.querySelector(".gotoform").style = "display: none;")
  : (document.querySelector(".user").style = "display: none;") &&
    (document.querySelector(".gotoform").style = "display: block;");
// document.querySelector("#Form").onchange = () => {
//   document.querySelector("#Form").checked &&
//     screen.orientation.lock("portrait-primary");
// };

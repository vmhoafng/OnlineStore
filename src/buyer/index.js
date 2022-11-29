import controllers from "../controllers/controller.js";
import { PRODUCT_LIST, typeList } from "../admin/list/productList.js";
import { USER_LIST } from "../admin/list/userList.js";
import { RECEIPT_LIST } from "../admin/list/receiptList.js";
import defaultUserList from "../admin/list/userList.js";
import defaultProductList from "../admin/list/productList.js";
import defaultReceiptList from "../admin/list/receiptList.js";
console.log(
  "🚀 ~ file: index.js ~ line 8 ~ defaultReceiptList",
  defaultReceiptList
);
import removeTones from "./removeTones.js";
let productList =
  JSON.parse(localStorage.getItem(PRODUCT_LIST)) ?? defaultProductList;
let userList = JSON.parse(localStorage.getItem(USER_LIST)) ?? defaultUserList;
let receiptList =
  JSON.parse(localStorage.getItem(RECEIPT_LIST)) ?? defaultReceiptList;
localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
localStorage.setItem(USER_LIST, JSON.stringify(userList));
localStorage.setItem(RECEIPT_LIST, JSON.stringify(receiptList));
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
  const existProduct =
    userStatus.cart && userStatus.cart.find((item) => item.id === product.id);
  if (existProduct) {
    userStatus.cart = controllers.update(userStatus.cart, existProduct.id, {
      ...existProduct,
      quantity: ++existProduct.quantity,
    });
  } else if (userStatus.cart) {
    userStatus.cart = controllers.add(userStatus.cart, product);
  }
  localStorage.setItem(currentUser, JSON.stringify({ ...userStatus }));
  updateUserList();
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
  updateUserList();
};
const addReceipt = (receipt) => {
  receiptList = controllers.add(receiptList, receipt);
  localStorage.setItem(RECEIPT_LIST, JSON.stringify(receiptList));
};
const buyAndGetReceipt = (total, address, phoneNumber) => {
  const date = new Date();
  const getDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${
    Number(date.getHours()) < 10 ? "0" + date.getHours() : date.getHours()
  }:${
    Number(date.getMinutes()) < 10 ? "0" + date.getMinutes() : date.getMinutes()
  }:${
    Number(date.getSeconds()) < 10 ? "0" + date.getSeconds() : date.getSeconds()
  }`;
  userStatus = {
    ...userStatus,
    receipt: [
      [...userStatus.cart, address, phoneNumber, getDate, total],
      ...userStatus.receipt,
    ],
  };
  addReceipt({
    id: receiptList.length + 1,
    userId: currentUser,
    address,
    phoneNumber,
    cart: [...userStatus.cart],
    status: false,
  });
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
      if (index >= start && index <= end) {
        return /*html */ `
        <input type="checkbox" name="detail" id="p${product.id}"/>
        <div class="Detail flex-center">
        <div class="wrapper">
            <img src="${product.img}" alt="" />
            <div class="wrapper flex-col item-start">
              <h2 class="flex item-center justify-between">${product.name}</h2>
              <h3>Price: ${product.price}$</h3>
              <input data-product=${product.id} value="1" min="1" type="number"/>
              <div>
                <h3>Description:</h3>
                <p>
                ${product.description}
                </p>
              </div>
            <button type="add" data-product=${product.id}>Add to cart</button>
            </div>
          </div>
          <label for="p${product.id}"></label>
        </div>
        <div data-product=${product.id} class="card flex-center">
          <div>${product.price}$</div>
          <img data-product=${product.id} src="${product.img}" alt="" />
          <div  class="show flex-center flex-col">
            <button type="add" data-product=${product.id}>Add to cart</button>
            <label for="p${product.id}">View detail</label>
          </div>
        </div>
            `;
      }
    });
    document.querySelector(".product").innerHTML = productHTML.join("");
    const cartHTML =
      currentUser &&
      userStatus.cart &&
      userStatus.cart.map((product) => {
        return /*html */ `
        <div class="box flex justify-between">
            <div class="detail flex-center">
              <img
                src=${product.img}
                alt="" />
              <div class="flex flex-col">
                <h3>${product.name}</h3>
                <div class="price">${product.price}$</div>
              </div>
            </div>
            <div class="flex-center">
              <button type="delete" data-product=${product.id} class="descrease">-</button>
              <span class="quantity" data-product=${product.id}>${product.quantity}</span>
              <button type="add" data-product=${product.id} class="increase">+</button>
            </div>
          </div>
          `;
      });
    document.querySelector(".cart .content").innerHTML =
      currentUser && userStatus.cart && cartHTML.join("");
    const typeHTML = typeList.map((type) => {
      if (filterArray.includes(type)) {
        return /*html */ `
        <li data-type="${type}" class="active">${type}</li>
        `;
      } else {
        return /*html */ `
        <li data-type="${type}" class="">${type}</li>
        `;
      }
    });
    document.querySelector("menu ul").innerHTML = typeHTML.join("");
    const totalArray =
      currentUser &&
      userStatus.cart &&
      userStatus.cart.map((product) => product.price * product.quantity);
    const totalCart =
      currentUser &&
      userStatus.cart &&
      totalArray.reduce((total, price) => {
        return total + price;
      }, 0);
    document.querySelector(".total .price").innerHTML = (totalCart || 0) + "$";

    const receiptHTML =
      currentUser &&
      userStatus.receipt &&
      userStatus.receipt.map((product) => {
        return /*html */ `
    <div class="flex flex-col">
      <span>Date: ${product[product.length - 2]}</span>
      ${product
        .map((item) => {
          if (typeof item == "object") {
            return /*html*/ `
      <div class="box flex justify-between">
        <div class="detail flex-center">
          <img src=${item.img} alt="" />
          <div class="flex flex-col">
            <h3>${item.name}</h3>
            <div class="price">${item.price}$</div>
          </div>
        </div>
        <div class="flex-center">
          <span class="quantity">${item.quantity}</span>
        </div>
      </div>`;
          }
        })
        .join("")}
      <span>Total: ${product[product.length - 1]}$</span>
    </div>
      `;
      });
    document.querySelector("#receipt section").innerHTML =
      currentUser && userStatus.receipt && receiptHTML.join("");
    // handleEvents
    // add product
    const handleAddIntoCart = () => {
      const getBtn = document.querySelectorAll("button[type=add]");
      getBtn.forEach((item) => {
        item.onclick = () => {
          const getQuantity = document.querySelector(
            `.quantity[data-product="${item.dataset.product}"]`
          );
          const getQuantityInput = document.querySelector(
            `.Detail input[data-product="${item.dataset.product}"]`
          );
          if (JSON.parse(localStorage.getItem("currentUser")) === null) {
            alert("Use need to login to buy products");
            document.querySelector("#Form").click();
            return;
          }
          const product = {
            id: item.dataset.product,
            quantity: (getQuantityInput && getQuantityInput.value) || 1,
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
      const getBtn = document.querySelectorAll("button[type=delete]");
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
        if (!currentUser) return;
        if (!userStatus.cart.length) return;
        const address = prompt("Nhập địa chỉ giao hàng:");
        const phoneNumber = prompt("Nhập số điện thoại:");
        if (!confirm("Xác nhận đơn hàng của bạn")) return;
        document.querySelector("#Cart").click();
        buyAndGetReceipt(totalCart, address, phoneNumber);
        updateUserList();
        render();
      };
    };
    handleBuy();
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
    const getBtn = document.querySelector(".user .logout");
    getBtn.onclick = () => {
      localStorage.setItem("currentUser", JSON.stringify(null));
      window.location.reload();
    };
  };
  handleLogOut();
};
App();

// Static
if (currentUser) {
  document.querySelector(".user").style = "display: block;";
  document.querySelector(".gotoform").style = "display: none;";
} else {
  document.querySelector(".user").style = "display: none;";
  document.querySelector(".gotoform").style = "display: block;";
}
// document.querySelector("#Form").onchange = () => {
//   document.querySelector("#Form").checked &&
//     screen.orientation.lock("portrait-primary");
// };

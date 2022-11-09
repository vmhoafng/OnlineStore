import controllers from "./controller/controller.js";
import { USER_LIST } from "./list/userList.js";
import { PRODUCT_LIST } from "./list/productList.js";
import defaultUserList from "./list/userList.js";
import defaultProductList from "./list/productList.js";

// Get list
let productList =
  JSON.parse(localStorage.getItem(PRODUCT_LIST)) ?? defaultProductList;
console.log(productList);
let userList = JSON.parse(localStorage.getItem(USER_LIST)) ?? defaultUserList;
console.log(userList);

// Render
const app = {
  render() {
    // RenderProduct
    const renderProduct = productList.map((product) => {
      return `
    <button data-index="${product.id}">Delete</button>
    `;
    });
    document.querySelector(".product").innerHTML = renderProduct.join("");
    // RenderUser
    userList.map((user) => {});
  },
  // Control productList
  handleAddProduct(product) {
    productList = controllers.add(productList, product);
    localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
    this.start();
  },
  handleUpdateProduct(index, product) {
    productList = controllers.update(productList, index, product);
    localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
  },
  handleDeleteProduct(index) {
    productList = controllers.delete(productList, index);
  },

  // Control userList
  handleAddUser(user) {
    userList = controllers.add(userList, user);
  },
  handleUpdateUser(index, user) {
    userList = controllers.update(userList, index, user);
  },
  handleDeleteUser(index) {
    userList = controllers.delete(userList, index);
  },
  // handleEvents
  handleEvents() {
    // delete product
    const getBtn = document.querySelectorAll("button");
    getBtn.forEach((element) => {
      element.onclick = () => {
        this.handleDeleteProduct(parseInt(element.dataset.index, 10));
        localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
        this.start();
      };
    });

    // add product
    const submit = document.querySelector(".submit");
    const getIdValue = document.querySelector(".id").value;
    const getNameValue = document.querySelector(".name").value;
    const getPriceValue = document.querySelector(".price").value;
    const getDescriptionValue = document.querySelector(".description").value;
    const getImgValue = document.querySelector(".img").value;
    const getTypeValue = document.querySelector(".type").value;
    submit.onclick = () => {
      (product = {
        id: Number(getIdValue),
        name: getNameValue,
        price: getPriceValue,
        description: getDescriptionValue,
        img: getImgValue,
        type: getTypeValue,
      }),
        // Validate values
        (productListLength = productList.length);
      for (let i = 0; i < productListLength; i++) {
        if (productList[i].id === product.id || isNaN(product.id)) {
          console.error("ID maybe exists or not valid. Please check!");
          return;
        }
      }
      productKeysLength = Object.keys(product).length;
      for (let i = 0; i < productKeysLength - 1; i++) {
        if (Object.values(product)[i] === "") {
          console.error("thiếu", Object.keys(product)[i]);
          return;
        }
      }
      handleAddProduct(product);
    };
  },
  start() {
    this.render();
    this.handleEvents();
    localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
    localStorage.setItem(USER_LIST, JSON.stringify(userList));
  },
};
app.start();

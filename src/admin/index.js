import controllers from "../controllers/controller.js";
import { USER_LIST } from "./list/userList.js";
import { PRODUCT_LIST } from "./list/productList.js";
import defaultUserList from "./list/userList.js";
import defaultProductList from "./list/productList.js";
import { validateValue } from "../controllers/validator.js";
// Get list
let productList =
  JSON.parse(localStorage.getItem(PRODUCT_LIST)) ?? defaultProductList;
console.log("🚀 ~ file: index.js ~ line 9 ~ productList", productList);
let userList = JSON.parse(localStorage.getItem(USER_LIST)) ?? defaultUserList;
console.log("🚀 ~ file: index.js ~ line 12 ~ userList", userList);

// Control productList
const addProduct = (product) => {
  productList = controllers.add(productList, product);
  localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
};
const updateProduct = (index, product) => {
  productList = controllers.update(productList, index, product);
  localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
};
const deleteProduct = (index) => {
  productList = controllers.delete(productList, index);
  localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
};
// Control userList
const addUser = (user) => {
  userList = controllers.add(userList, user);
  localStorage.setItem(USER_LIST, JSON.stringify(userList));
};
const updateUser = (index, user) => {
  userList = controllers.update(userList, index, user);
  localStorage.setItem(USER_LIST, JSON.stringify(userList));
};
const deleteUser = (index) => {
  userList = controllers.delete(userList, index);
  localStorage.setItem(USER_LIST, JSON.stringify(userList));
};

// Render
const render = () => {
  // RenderProduct
  const renderProduct = productList.map((product) => {
    return `
    <li>
      <input data-product="${product.id}" class="id" type="text" />
      <input data-product="${product.id}" class="name" type="text" />
      <input data-product="${product.id}" class="price" type="text" />
      <input data-product="${product.id}" class="description" type="text" />
      <input data-product="${product.id}" class="img" type="text" />
      <input data-product="${product.id}" class="type" type="text" />
      <button data-product="${product.id}" class="submit">Submit</button>
      <button data-product="${product.id}" class="button">Delete</button>
    </li>
    `;
  });
  document.querySelector(".product").innerHTML = renderProduct.join("");
  // RenderUser
  const renderUser = userList.map((user) => {
    return ` 
    <li>
    <input data-user="${user.id}" class="name" type="text" />
    <input data-user="${user.id}" class="password" type="text" />
    <input data-user="${user.id}" class="isAdmin" type="text" />
    <input data-user="${user.id}" class="addresses" type="text" />
    <input data-user="${user.id}" class="phoneNumber" type="text" />
    <input data-user="${user.id}" class="cart" type="text" />
    <button data-user="${user.id}" class="submit">Submit</button>
    <button data-user="${user.id}" class="button">Delete</button>
  </li>`;
  });
  document.querySelector(".user").innerHTML = renderUser.join("");

  // handleEvents
  // add product
  const handleAddProduct = () => {
    const submit = document.querySelector(".submit");
    const getId = document.querySelector(".id");
    const getName = document.querySelector(".name");
    const getPrice = document.querySelector(".price");
    const getDescription = document.querySelector(".description");
    const getImg = document.querySelector(".img");
    const getType = document.querySelector(".type");
    submit.onclick = () => {
      const product = {
        id: getId.value,
        name: getName.value,
        price: getPrice.value,
        description: getDescription.value,
        img: getImg.value,
        type: getType.value,
      };
      // Validate values
      if (
        !validateValue(
          productList,
          product,
          "ID đã tồn tại hoặc không hợp lệ",
          "Thiếu"
        )
      )
        return;
      getId.value = "";
      getName.value = "";
      getPrice.value = "";
      getDescription.value = "";
      getImg.value = "";
      getType.value = "";
      addProduct(product);
      console.log(
        "🚀 ~ file: index.js ~ line 101 ~ handleAddProduct ~ productList",
        productList
      );
      render();
    };
  };
  handleAddProduct();
  // delete product
  const handleDeleteProduct = () => {
    const getBtn = document.querySelectorAll(".button[data-product]");
    getBtn.forEach((element) => {
      element.onclick = () => {
        // if (!confirm("Xoá")) return;
        deleteProduct(element.dataset.product);
        render();
      };
    });
  };
  handleDeleteProduct();
  // handleUpdateProduct
  const handleUpdateProduct = () => {
    const submit = document.querySelectorAll(".submit");
    submit.forEach((item) => {
      const index = Number(item.dataset.product);
      const getId = document.querySelector(`.id[data-product="${index}"]`);
      const getName = document.querySelector(`.name[data-product="${index}"]`);
      const getPrice = document.querySelector(
        `.price[data-product="${index}"]`
      );
      const getDescription = document.querySelector(
        `.description[data-product="${index}"]`
      );
      const getImg = document.querySelector(`.img[data-product="${index}"]`);
      const getType = document.querySelector(`.type[data-product="${index}"]`);
      item.onclick = () => {
        const product = {
          id: Number(getId.value),
          name: getName.value,
          price: getPrice.value,
          description: getDescription.value,
          img: getImg.value,
          type: getType.value,
        };
        if (!validateValue(productList, product, "ID đã tồn tại", "Thiếu"))
          return;
        updateProduct(index, product);
        console.log(productList);
        render();
      };
    });
  };
  // handleUpdateProduct();
  // add user
  const handleAdduser = () => {
    const submit = document.querySelector(".submit");
    const getName = document.querySelector(".name");
    const getPassword = document.querySelector(".password");
    const getIsAdmin = document.querySelector(".isAdmin");
    const getAddresses = document.querySelector(".addresses");
    const getPhoneNumbers = document.querySelector(".phoneNumbers");
    const getCart = document.querySelector(".cart");
    submit.onclick = () => {
      const user = {
        name: getName.values,
        password: getPassword.value,
        isAdmin: getIsAdmin.value,
        addresses: getAddresses.value,
        phoneNumbers: getPhoneNumbers.value,
        cart: getCart.value,
      };
      // Validate values
      if (!validateValue(userList, user, "UserID đã tồn tại", "Thiếu")) return;
      getId.value = "";
      getName.value = "";
      getPrice.value = "";
      getDescription.value = "";
      getImg.value = "";
      getType.value = "";
      addUser(user);
      console.log(
        "🚀 ~ file: index.js ~ line 101 ~ handleAdduser ~ userList",
        userList
      );
      render();
    };
  };
  // handleAdduser();
  // delete user
  const handleDeleteUser = () => {
    const getBtn = document.querySelectorAll(".button[data-user]");
    getBtn.forEach((element) => {
      element.onclick = () => {
        console.log(element);
        // if (!confirm("Xoá")) return;
        deleteUser(element.dataset.user);
        render();
      };
    });
  };
  // handleDeleteUser();
  // handleUpdateuser
  const handleUpdateUser = () => {
    const submit = document.querySelectorAll(".submit");
    submit.forEach((item) => {
      const index = Number(item.dataset.user);
      const getId = document.querySelector(`.id[data-user="${index}"]`);
      const getName = document.querySelector(`.name[data-user="${index}"]`);
      const getPrice = document.querySelector(`.price[data-user="${index}"]`);
      const getDescription = document.querySelector(
        `.description[data-user="${index}"]`
      );
      const getImg = document.querySelector(`.img[data-user="${index}"]`);
      const getType = document.querySelector(`.type[data-user="${index}"]`);
      item.onclick = () => {
        const user = {
          id: Number(getId.value),
          name: getName.value,
          price: getPrice.value,
          description: getDescription.value,
          img: getImg.value,
          type: getType.value,
        };
        if (!validateValue(userList, user, "UserID đã tồn tại", "Thiếu"))
          return;
        updateUser(index, user);
        console.log(userList);
        render();
      };
    });
  };
  // handleUpdateUser();
};
render();

localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
localStorage.setItem(USER_LIST, JSON.stringify(userList));

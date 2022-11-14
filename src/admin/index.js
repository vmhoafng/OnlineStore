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
console.log("🚀 ~ file: index.js ~ line 12 ~ userList", userList[2].cart);

// Control productList
const addProduct = (product) => {
  productList = controllers.add(productList, product);
  localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
};
const updateProduct = (updateId, product) => {
  productList = controllers.update(productList, updateId, product);
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
    if (window.innerWidth < 1024) {
      return `
      <table>
        <tr>
          <th>ID</th>
          <td data-product=${product.id} class="id">${product.id}</td>
        </tr>
        <tr>
          <th>Product name</th>
          <td data-product=${product.id} class="name">${product.name}</td>
        </tr>
        <tr>
          <th>Type</th>
          <td data-product=${product.id} class="type">${product.type}</td>
        </tr>
        <tr>
          <th>Price</th>
          <td data-product=${product.id} class="price">${product.price}</td>
        </tr>
        <tr>
          <th>Image</th>
          <td><img data-product=${product.id} class="img" src="${product.img}" alt=""></td>
        </tr>
        <tr>
          <th>Description</th>
          <td data-product=${product.id} class="description"><div>${product.description}</div></td>
        </tr>
        <tr>
          <th>Action</th>
          <td>
            <div class="flex item-center">
            <button class="btn" data-product=${product.id} type="delete">Delete</button>
            <button class="btn" data-product=${product.id} type="update">Update</button>
            <button class="btn" data-product=${product.id} type="save">save</button>
            </div>
          </td>
        </tr>
    </table>
  `;
    } else {
      return `
    <tr>
    <td class="id" data-product=${product.id}>${product.id}</td>
    <td class="name" data-product=${product.id}>${product.name}</td>
    <td class="type" data-product=${product.id}>${product.type}</td>
    <td class="price" data-product=${product.id}>${product.price}</td>
    <td><img class="img" data-product=${product.id} src="${product.img}" alt=""></td>
    <td><div class="description" data-product=${product.id}>${product.description}</div></td>
    <td>
      <div class="flex item-center">
      <button class="btn" data-product=${product.id} type="delete">Delete</button>
      <button class="btn" data-product=${product.id} type="update">Update</button>
      <button class="btn" data-product=${product.id} type="save">save</button>
      </div>
    </td>
    </tr>
  `;
    }
  });
  if (window.innerWidth < 1024) {
    document.querySelector(".product div").innerHTML = renderProduct.join("");
  } else {
    document.querySelector(".product div").innerHTML = `
    <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Product name </th>
        <th>Type</th>
        <th>Price</th>
        <th>Image</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>`;
    document.querySelector(".product div table tbody").innerHTML =
      renderProduct.join("");
  }
  // RenderUser
  const renderUser = userList.map((user, index) => {
    if (window.innerWidth < 1024) {
      return `  
      <table>
      <tr>
        <th>ID</th>
        <td>${user.id}</td>
      </tr>
      <tr>
        <th>Password</th>
        <td> ${user.password}</td>
      </tr>
      <tr>
        <th>isAdmin</th>
        <td>${user.isAdmin}</td>
      </tr>
      <tr>
        <th>Address</th>
        <td>${user.addresses}</td>
      </tr>
      <tr>
        <th>Phone numbers</th>
        <td>${user.phoneNumbers}</td>
      </tr>
      <tr>
        <th>Cart</th>
        <td>${
          user.cart &&
          user.cart
            .map((item) => {
              return `{
                id: ${item.id},
                quantity: ${item.quantity},
                description: ${item.description},
                img: ${item.img},
                name: ${item.name},
                price: ${item.price},
                type: ${item.quantity},
              }`;
            })
            .join(`, `)
        }</td>
      </tr>
      <tr>
        <th>Action</th>
        <td>
          <div class="flex item-center">
            <button class="btn" data-user=${
              user.id
            } type="delete">Delete</button>
            <button class="btn" type="update">Update</button>
            <button class="btn" type="save">save</button>
          </div>
        </td>
    </tr>
  </table>`;
    } else {
      return `<tr>
    <td>${user.id}</td>
    <td> ${user.password}</td>
    <td>${user.isAdmin}</td>
    <td>${user.addresses}</td>
    <td>${user.phoneNumbers}</td>
    <td>${user.cart}</td>
    <td>
    <div class="flex item-center">
      <button class="btn" data-user=${user.id} type="delete">Delete</button>
      <button class="btn" type="update">Update</button>
      </div>
    </td>
    </tr>
  `;
    }
  });
  if (window.innerWidth < 1024) {
    document.querySelector(".user div").innerHTML = renderUser.join("");
  } else {
    document.querySelector(".user div").innerHTML = `
    <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Password </th>
        <th>isAdmin</th>
        <th>Address</th>
        <th>Phone numbers</th>
        <th>Cart</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>`;
    document.querySelector(".user div table tbody").innerHTML =
      renderUser.join("");
  }

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
    const getBtn = document.querySelectorAll(
      "button[data-product][type=delete]"
    );
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
    const update = document.querySelectorAll(
      "button[data-product][type=update]"
    );
    const save = document.querySelectorAll("button[data-product][type=save]");
    update.forEach((item) => {
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
        console.log(item);
        getId.setAttribute("contenteditable", "true");
        getName.setAttribute("contenteditable", "true");
        getPrice.setAttribute("contenteditable", "true");
        getDescription.setAttribute("contenteditable", "true");
        getImg.setAttribute("contenteditable", "true");
        getType.setAttribute("contenteditable", "true");
      };
    });
    save.forEach((item) => {
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
          id: getId.innerHTML,
          name: getName.innerHTML,
          price: getPrice.innerHTML,
          description: getDescription.innerHTML,
          img: getImg.src,
          type: getType.innerHTML,
        };
        console.log(index.toString(), product, productList);
        updateProduct(index.toString(), product);
        getId.setAttribute("contenteditable", "false");
        getName.setAttribute("contenteditable", "false");
        getPrice.setAttribute("contenteditable", "false");
        getDescription.setAttribute("contenteditable", "false");
        getImg.setAttribute("contenteditable", "false");
        getType.setAttribute("contenteditable", "false");
        render();
      };
    });
  };
  handleUpdateProduct();
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
    const getBtn = document.querySelectorAll("button[data-user][type=delete]");
    getBtn.forEach((element) => {
      element.onclick = () => {
        // if (!confirm("Xoá")) return;
        deleteUser(element.dataset.user);
        render();
      };
    });
  };
  handleDeleteUser();
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
  window.onresize = () => {
    render();
  };
};
render();

localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
localStorage.setItem(USER_LIST, JSON.stringify(userList));

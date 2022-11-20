import controllers from "../controllers/controller.js";
import { USER_LIST } from "./list/userList.js";
import { PRODUCT_LIST } from "./list/productList.js";
import defaultUserList from "./list/userList.js";
import defaultProductList from "./list/productList.js";
import { validateValue } from "../controllers/validator.js";
// Get list
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userStatus = JSON.parse(localStorage.getItem(currentUser));
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
    if (window.innerWidth < 1280) {
      return `
      <table>
        <tr data-product=${product.id}>
          <th>ID</th>
          <td data-product=${product.id} class="id">${product.id}</td>
        </tr>
        <tr data-product=${product.id}>
          <th>Product name</th>
          <td data-product=${product.id} class="name">${product.name}</td>
        </tr>
        <tr data-product=${product.id}>
          <th>Type</th>
          <td data-product=${product.id} class="type">${product.type}</td>
        </tr>
        <tr data-product=${product.id}>
          <th>Price</th>
          <td data-product=${product.id} class="price">${product.price}</td>
        </tr>
        <tr data-product=${product.id}>
          <th>Image</th>
          <td data-product=${product.id}><img data-product=${product.id} class="img" src="${product.img}" alt=""></td>
        </tr>
        <tr data-product=${product.id}>
          <th>Description</th>
          <td data-product=${product.id} class="description"><div>${product.description}</div></td>
        </tr>
        <tr data-product=${product.id}>
          <th>Action</th>
          <td data-product=${product.id}>
            <div class="flex-center">
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
    <tr data-product=${product.id}>
    <td class="id" data-product=${product.id}>${product.id}</td>
    <td class="name" data-product=${product.id}>${product.name}</td>
    <td class="type" data-product=${product.id}>${product.type}</td>
    <td class="price" data-product=${product.id}>${product.price}</td>
    <td data-product=${product.id}><img class="img" data-product=${product.id} src="${product.img}" alt=""></td>
    <td class="description" data-product=${product.id}><div>${product.description}</div></td>
    <td data-product=${product.id}>
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
  if (window.innerWidth < 1280) {
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
  const renderUser = userList.map((user) => {
    if (window.innerWidth < 1280) {
      return `  
      <table>
      <tr>
        <th>ID</th>
        <td data-user=${user.id} class="id">${user.id}</td>
      </tr>
      <tr>
        <th>Password</th>
        <td data-user=${user.id} class="password"> ${user.password}</td>
      </tr>
      <tr>
        <th>isAdmin</th>
        <td data-user=${user.id} class="isAdmin">${user.isAdmin}</td>
      </tr>
      <tr>
        <th>Cart</th>
        <td data-user=${user.id} >
          <ul>${user.cart
            .map((item) => {
              console.log(item);
              return `<li>
                id: ${item.id},
                quantity: ${item.quantity},
                name: ${item.name},
              </li>`;
            })
            .join("")}
            </ul>
          </td>
      </tr>
      <tr>
        <th>Action</th>
        <td>
          <div class="flex-center">
            <button class="btn" data-user=${
              user.id
            } type="delete">Delete</button>
            <button class="btn" data-user=${
              user.id
            } type="update">Update</button>
            <button class="btn" data-user=${user.id} type="save">save</button>
          </div>
        </td>
    </tr>
  </table>`;
    } else {
      return `<tr>
    <td data-user=${user.id} class="id">${user.id}</td>
    <td data-user=${user.id} class="password">${user.password}</td>
    <td data-user=${user.id} class="isAdmin">${user.isAdmin}</td>
    <td data-user=${user.id} class="cart">
    <ul>${user.cart
      .map((item) => {
        return `<li>
          id: ${item.id},
          quantity: ${item.quantity},
          name: ${item.name},
        </li>`;
      })
      .join("")}
      </ul></td>
    <td>
    <div class="flex-center">
      <button class="btn" data-user=${user.id} type="delete">Delete</button>
      <button class="btn" data-user=${user.id} type="update">Update</button>
      <button class="btn" data-user=${user.id} type="save">Save</button>
      </div>
    </td>
    </tr>
  `;
    }
  });
  if (window.innerWidth < 1280) {
    document.querySelector(".user > div").innerHTML = renderUser.join("");
  } else {
    document.querySelector(".user > div").innerHTML = `
    <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Password </th>
        <th>isAdmin</th>
        <th>Cart</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>`;
    document.querySelector(".user > div table tbody").innerHTML =
      renderUser.join("");
  }
  // handleEvents
  // add product
  const handleAddProduct = () => {
    const submit = document.querySelector("#addproduct");
    const getId = document.querySelector("#idproduct");
    const getName = document.querySelector("#nameproduct");
    const getPrice = document.querySelector("#priceproduct");
    const getDescription = document.querySelector("#description-product");
    const getImg = document.querySelector("#imgproduct");
    const getType = document.querySelector("#type-select");
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
      const index = item.dataset.product;
      const tr = document.querySelectorAll(`tr[data-product="${index}"]`);
      const td = document.querySelectorAll(`td[data-product="${index}"]`);
      const getId = document.querySelector(`.id[data-product="${index}"]`);
      const getName = document.querySelector(`.name[data-product="${index}"]`);
      const getPrice = document.querySelector(
        `.price[data-product="${index}"]`
      );
      const getDescription = document.querySelector(
        `.description[data-product="${index}"] div`
      );
      const getImg = document.querySelector(`.img[data-product="${index}"]`);
      const getType = document.querySelector(`.type[data-product="${index}"]`);
      item.onclick = () => {
        getId.setAttribute("contenteditable", "true");
        getName.setAttribute("contenteditable", "true");
        getPrice.setAttribute("contenteditable", "true");
        getDescription.setAttribute("contenteditable", "true");
        getImg.setAttribute("contenteditable", "true");
        getType.setAttribute("contenteditable", "true");
        tr.forEach((tr) => {
          tr.classList.add("active");
        });
        td.forEach((td) => {
          td.classList.add("active");
        });
      };
    });
    save.forEach((item) => {
      const index = item.dataset.product;
      const getId = document.querySelector(`.id[data-product="${index}"]`);
      const getName = document.querySelector(`.name[data-product="${index}"]`);
      const getPrice = document.querySelector(
        `.price[data-product="${index}"]`
      );
      const getDescription = document.querySelector(
        `.description[data-product="${index}"] div`
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
    const getPhoneNumber = document.querySelector(".phoneNumber");
    const getCart = document.querySelector(".cart");
    submit.onclick = () => {
      const user = {
        name: getName.values,
        password: getPassword.value,
        isAdmin: getIsAdmin.value,
        addresses: getAddresses.value,
        phoneNumber: getPhoneNumber.value,
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
      render();
    };
  };
  // handleAdduser();
  // delete user
  const handleDeleteUser = () => {
    const getBtn = document.querySelectorAll("button[data-user][type=delete]");
    getBtn.forEach((element) => {
      element.onclick = () => {
        if (!confirm("Xoá")) return;
        deleteUser(element.dataset.user);
        render();
      };
    });
  };
  handleDeleteUser();
  // handleUpdateuser
  const handleUpdateUser = () => {
    const update = document.querySelectorAll("button[data-user][type=update]");
    const save = document.querySelectorAll("button[data-user][type=save]");
    update.forEach((item) => {
      const index = item.dataset.user;
      const getId = document.querySelector(`.id[data-user="${index}"]`);
      const getPassword = document.querySelector(
        `.password[data-user="${index}"]`
      );
      const getIsAdmin = document.querySelector(
        `.isAdmin[data-user="${index}"]`
      );
      const getAddresses = document.querySelector(
        `.addresses[data-user="${index}"]`
      );
      const getPhoneNumber = document.querySelector(
        `.phoneNumber[data-user="${index}"]`
      );
      item.onclick = () => {
        getId.setAttribute("contenteditable", "true");
        getPassword.setAttribute("contenteditable", "true");
        getIsAdmin.setAttribute("contenteditable", "true");
        getAddresses.setAttribute("contenteditable", "true");
        getPhoneNumber.setAttribute("contenteditable", "true");
      };
    });
    save.forEach((item) => {
      const index = item.dataset.user;
      const getId = document.querySelector(`.id[data-user="${index}"]`);
      const getPassword = document.querySelector(
        `.password[data-user="${index}"]`
      );
      const getIsAdmin = document.querySelector(
        `.isAdmin[data-user="${index}"]`
      );
      const getAddress = document.querySelector(
        `.address[data-user="${index}"]`
      );
      const getPhoneNumber = document.querySelector(
        `.phoneNumber[data-user="${index}"]`
      );
      item.onclick = () => {
        const user = {
          id: getId.innerHTML,
          password: getPassword.innerHTML,
          isAdmin: getIsAdmin.innerHTML,
          address: getAddress.innerHTML,
          phoneNumber: getPhoneNumber.innerHTML,
        };
        if (!validateValue(userList, user, "UserID đã tồn tại", "Thiếu"))
          return;
        getId.setAttribute("contenteditable", "true");
        getPassword.setAttribute("contenteditable", "true");
        getIsAdmin.setAttribute("contenteditable", "true");
        getAddress.setAttribute("contenteditable", "true");
        getPhoneNumber.setAttribute("contenteditable", "true");
        updateUser(index, user);
        render();
      };
    });
  };
  handleUpdateUser();
  const handleLogOut = () => {
    const getBtn = document.querySelector(".app__logout");
    getBtn.onclick = () => {
      localStorage.setItem("currentUser", JSON.stringify(null));
    };
  };
  handleLogOut();
  window.onresize = () => {
    render();
  };
};
render();
localStorage.setItem(PRODUCT_LIST, JSON.stringify(productList));
localStorage.setItem(USER_LIST, JSON.stringify(userList));

import controllers from "../controllers/controller.js";
import { USER_LIST } from "./list/userList.js";
import { PRODUCT_LIST } from "./list/productList.js";
import { RECEIPT_LIST } from "./list/receiptList.js";
import defaultUserList from "./list/userList.js";
import defaultProductList from "./list/productList.js";
import defaultReceiptList from "./list/receiptList.js";
import { validateValue } from "../controllers/validator.js";
// Get list
let productList =
  JSON.parse(localStorage.getItem(PRODUCT_LIST)) ?? defaultProductList;
console.log("🚀 ~ file: index.js ~ line 9 ~ productList", productList);
let userList = JSON.parse(localStorage.getItem(USER_LIST)) ?? defaultUserList;
console.log("🚀 ~ file: index.js ~ line 12 ~ userList", userList);
let receiptList =
  JSON.parse(localStorage.getItem(RECEIPT_LIST)) ?? defaultReceiptList;
console.log(
  "🚀 ~ file: index.js ~ line 20 ~ defaultReceiptList",
  defaultReceiptList
);

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
// Control receiptList
const addReceipt = (receipt) => {
  receiptList = controllers.add(receiptList, receipt);
  localStorage.setItem(RECEIPT_LIST, JSON.stringify(receiptList));
};
const updateReceipt = (index, receipt) => {
  receiptList = controllers.update(receiptList, index, receipt);
  localStorage.setItem(RECEIPT_LIST, JSON.stringify(receiptList));
};
const deleteReceipt = (index) => {
  receiptList = controllers.delete(receiptList, index);
  localStorage.setItem(RECEIPT_LIST, JSON.stringify(receiptList));
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
          <td data-product=${product.id}><img id="imgId" data-product=${product.id} class="img" src="${product.img}" alt="">
          <input
          data-product=${product.id}
                    type="file"
                    class="imgproduct"
                    name="imgproduct"
                    accept="image/*"
                  />
          </td>
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
            <button class="btn" data-product=${product.id} type="save">Save</button>
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
    <td data-product=${product.id}><img id="imgId" class="img" data-product=${product.id} src="${product.img}" alt="">
    <input
    data-product=${product.id}
    type="file"
    class="imgproduct"
    name="imgproduct"
    accept="image/*"
  />
    </td>
    <td class="description" data-product=${product.id}><div>${product.description}</div></td>
    <td data-product=${product.id}>
      <div class="flex item-center">
      <button class="btn" data-product=${product.id} type="delete">Delete</button>
      <button class="btn" data-product=${product.id} type="update">Update</button>
      <button class="btn" data-product=${product.id} type="save">Save</button>
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
        <th>Action</th>
        <td data-user=${user.id}>
          <div class="flex-center">
            <button class="btn" data-user=${user.id} type="delete">Delete</button>
            <button class="btn" data-user=${user.id} type="update">Update</button>
            <button class="btn" data-user=${user.id} type="save">Save</button>
          </div>
        </td>
    </tr>
  </table>`;
    } else {
      return `<tr>
    <td data-user=${user.id} class="id">${user.id}</td>
    <td data-user=${user.id} class="password">${user.password}</td>
    <td data-user=${user.id} class="isAdmin">${user.isAdmin}</td>
    <td data-user=${user.id} >
    <div class="flex-center">
      <button class="btn" data-user=${user.id} type="delete">Delete</button>
      <button class="btn" id="update" data-user=${user.id} type="update">Update</button>
      <button class="btn" id="save" data-user=${user.id} type="save">Save</button>
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
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>`;
    document.querySelector(".user > div table tbody").innerHTML =
      renderUser.join("");
  }
  //render Receipt
  const renderReceipt = receiptList.map((receipt) => {
    if (window.innerWidth < 1280) {
      return `  
      <table>
      <tr>
        <th>ID</th>
        <td data-receipt=${receipt.receiptId} class="id">${receipt.receiptId}</td>
      </tr>
      <tr>
        <th>Product ID</th>
        <td data-receipt=${receipt.receiptId} class="productId">${receipt.id}</td>
      </tr>
      <tr>
        <th>Quantity</th>
        <td data-receipt=${receipt.receiptId} class="quantity"> ${receipt.quantity}</td>
      </tr>
      <tr>
        <th>User ID</th>
        <td data-receipt=${receipt.receiptId} class="userId">${receipt.userId}</td>
      </tr>
      <tr>
        <th>Status</th>
        <td data-receipt=${receipt.receiptId} class="status">${receipt.status}</td>
      </tr>
      <tr>
        <th>Action</th>
        <td data-receipt=${receipt.id}>
          <div class="flex-center">
            <button class="btn" data-receipt=${receipt.id} type="delete">Delete</button>
            <button class="btn" data-receipt=${receipt.id} type="update">Update</button>
            <button class="btn" data-receipt=${receipt.id} type="save">Save</button>
          </div>
        </td>
    </tr>
  </table>`;
    } else {
      return `<tr>
    <td data-receipt=${receipt.id} class="id">${receipt.id}</td>
    <td data-receipt=${receipt.id} class="password">${receipt.password}</td>
    <td data-receipt=${receipt.id} class="isAdmin">${receipt.isAdmin}</td>
    <td data-receipt=${receipt.id} >
    <div class="flex-center">
      <button class="btn" data-receipt=${receipt.id} type="delete">Delete</button>
      <button class="btn" id="update" data-receipt=${receipt.id} type="update">Update</button>
      <button class="btn" id="save" data-receipt=${receipt.id} type="save">Save</button>
      </div>
    </td>
    </tr>
  `;
    }
  });
  if (window.innerWidth < 1280) {
    document.querySelector(".receipt > div").innerHTML = renderReceipt.join("");
  } else {
    document.querySelector(".receipt > div").innerHTML = `
    <table>
    <thead>
      <tr>
        <th>Receipt Id</th>
        <th>Product Id </th>
        <th>Quantity</th>
        <th>User Id</th>
        <th>Status</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>`;
    document.querySelector(".receipt > div table tbody").innerHTML =
      renderReceipt.join("");
  }

  // handleEvents
  // add product
  const handleAddProduct = () => {
    const submit = document.querySelector("#addproduct");
    const getId = document.querySelector("#idproduct");
    const getName = document.querySelector("#nameproduct");
    const getPrice = document.querySelector("#priceproduct");
    const getDescription = document.querySelector("#description-product");
    const getImg = document.getElementById("imgpreview");
    const getType = document.querySelector("#type-select");
    submit.onclick = () => {
      const product = {
        id: getId.value,
        name: getName.value,
        price: getPrice.value,
        description: getDescription.value,
        img: getImg.src,
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
      getImg.src = "";
      getType.value = "";
      addProduct(product);
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
        if (!confirm("Bạn có chắc chắn xóa không?")) return;
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
      const imgProduct = document.querySelector(
        `.imgproduct[data-product="${index}"]`
      );

      const getType = document.querySelector(`.type[data-product="${index}"]`);
      const getUpdateBtn = document.querySelector(
        `button[type="update"][data-product="${index}"]`
      );
      const getSaveBtn = document.querySelector(
        `button[type="save"][data-product="${index}"]`
      );
      item.onclick = () => {
        getUpdateBtn.style.display = "none";
        getSaveBtn.style.display = "block";
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
        imgProduct.style.display = "block";
        imgProduct.addEventListener("change", function () {
          getImgData();
        });
        function getImgData() {
          const files = imgProduct.files[0];
          if (files) {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(files);
            fileReader.addEventListener("load", function () {
              getImg.style.display = "block";
              getImg.src = this.result;
            });
          }
        }
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
    const submit = document.querySelector("#adduser");
    const getId = document.querySelector("#iduser");
    const getPassword = document.querySelector("#passworduser");
    const getIsAdmin = document.querySelector("#checkadmin");
    submit.onclick = () => {
      const user = {
        id: getId.value,
        password: getPassword.value,
        isAdmin: getIsAdmin.value,
      };
      // Validate values
      if (!validateValue(userList, user, "UserID đã tồn tại", "Thiếu")) return;
      getId.value = "";
      getPassword.value = "";
      getIsAdmin.value = "";
      addUser(user);
      render();
    };
  };
  handleAdduser();
  // delete user
  const handleDeleteUser = () => {
    const getBtn = document.querySelectorAll("button[data-user][type=delete]");
    getBtn.forEach((element) => {
      element.onclick = () => {
        if (!confirm("Bạn có chắc chắn xóa không?")) return;
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
      const tr = document.querySelectorAll(`tr[data-user="${index}"]`);
      const td = document.querySelectorAll(`td[data-user="${index}"]`);
      const getId = document.querySelector(`.id[data-user="${index}"]`);
      const getPassword = document.querySelector(
        `.password[data-user="${index}"]`
      );
      const getIsAdmin = document.querySelector(
        `.isAdmin[data-user="${index}"]`
      );
      const getUpdateBtn = document.querySelector(
        `button[type="update"][data-user="${index}"]`
      );
      const getSaveBtn = document.querySelector(
        `button[type="save"][data-user="${index}"]`
      );
      item.onclick = () => {
        getUpdateBtn.style.display = "none";
        getSaveBtn.style.display = "block";
        getId.setAttribute("contenteditable", "true");
        getPassword.setAttribute("contenteditable", "true");
        getIsAdmin.setAttribute("contenteditable", "true");
        tr.forEach((tr) => {
          tr.classList.add("active");
        });
        td.forEach((td) => {
          td.classList.add("active");
        });
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
      item.onclick = () => {
        const user = {
          id: getId.innerHTML,
          password: getPassword.innerHTML,
          isAdmin: getIsAdmin.innerHTML,
        };
        if (!validateValue(userList, user, "UserID đã tồn tại", "Thiếu"))
          return;
        getId.setAttribute("contenteditable", "true");
        getPassword.setAttribute("contenteditable", "true");
        getIsAdmin.setAttribute("contenteditable", "true");
        updateUser(index.toString(), user);
        render();
      };
    });
  };
  handleUpdateUser();
  const handleLogOut = () => {
    const getBtn = document.querySelector(".app__logout");
    getBtn.onclick = () => {
      localStorage.setItem("currentUser", JSON.stringify(null));
      window.location = "../buyer";
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

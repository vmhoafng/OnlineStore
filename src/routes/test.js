const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
// let config = localStorage.getItem("currentUser");
// let getUsers = JSON.parse(config);
let getUser = JSON.parse(localStorage.getItem("currentUser") || {});
let config = JSON.parse(localStorage.getItem(getUser));
function setConfig(key, value) {
  config[key] = value;
  localStorage.setItem(getUser, JSON.stringify(config));
}

setConfig("cart", [
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
  {
    id: 1,
  },
]);
console.log();
const app = {
  handleEvents() {},
  render() {},
  start() {
    this.render();
    this.handleEvents();
  },
};
let productId = 1;
let productLimited = `?limit=5`;
function getProduct(prods, get) {
  fetch(
    `https://fakestoreapi.com/products`
    // , {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: "test product",
    //     price: 13.5,
    //     description: "lorem ipsum set",
    //     image: "https://i.pravatar.cc",
    //     category: "electronic",
    //   }),
    // }
  )
    .then((res) => res.json())
    .then(prods);
}
function RenderProduct(prods) {
  let listProdBlock = $(".prod__list");
  console.log(prods);
  let htmls = prods.map((prod) => {
    return `
    <li>${prod.category}</li>
    <img style="width: 100px;" src="${prod.image}"/>
    `;
  });
  listProdBlock.innerHTML = htmls.join("");
}
getProduct(RenderProduct);
function renderUsername() {
  let username = $(".username");
  username.innerHTML = getUser;
}
renderUsername.call();

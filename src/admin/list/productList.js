const armchairImg = "../public/img/Armchair-removebg-preview.png";
const chairImg = "../public/img/chair-removebg-preview.png";
const clockImg = "../public/img/Clock-removebg-preview.png";
const allImg = "../public/img/Composition-table-laptop_preview.png";
const easelImg = "../public/img/Easel-removebg-preview.png";
const electricClockImg = "../public/img/Electric_clock-removebg-preview.png";
const lampImg = "../public/img/Lamp-removebg-preview.png";
const pencilImg = "../public/img/Pencil-removebg-preview.png";
const sofaImg = "../public/img/Sofa-removebg-preview.png";
const tableImg = "../public/img/Table-removebg-preview.png";
const table2Img = "../public/img/Table2-removebg-preview.png";

const PRODUCT_LIST = "PRODUCT_LIST";

const type = {
  table: "Table",
  chair: "Chair",
  lamp: "Lamp",
  clock: "Clock",
  combo: "Combo",
};
const typeList = Object.values(type);
const defaultProductList = [
  {
    id: "0",
    name: "Armchair",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: armchairImg,
    type: type.chair,
  },
  {
    id: "1",
    name: "Chair",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: chairImg,
    type: type.chair,
  },
  {
    id: "2",
    name: "Clock",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: clockImg,
    type: type.clock,
  },
  {
    id: "3",
    name: "all",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: allImg,
    type: type.combo,
  },
  {
    id: "4",
    name: "easel",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: easelImg,
    type: type.combo,
  },
  {
    id: "5",
    name: "electricClock",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: electricClockImg,
    type: type.clock,
  },
  {
    id: "6",
    name: "lamp",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: lampImg,
    type: type.lamp,
  },
  {
    id: "7",
    name: "pencil",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: pencilImg,
    type: "",
  },
  {
    id: "8",
    name: "lamp",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: lampImg,
    type: type.lamp,
  },
  {
    id: "9",
    name: "sofa",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: sofaImg,
    type: "",
  },
  {
    id: "10",
    name: "table2",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: table2Img,
    type: type.table,
  },
  {
    id: "11",
    name: "table",
    price: 13.5,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel eveniet alias a rerum sint at reiciendis soluta eligendi, illo, odit incidunt labore hic dolor repudiandae accusamus, aperiam perspiciatis culpa quaerat.",
    img: tableImg,
    type: type.table,
  },
];
export default defaultProductList;
export { PRODUCT_LIST, typeList };

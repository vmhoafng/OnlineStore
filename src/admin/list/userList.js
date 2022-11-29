"use strict";

export const USER_LIST = "USER_LIST";

const defaultUserList = [
  {
    id: "Administrator",
    password: "Administrator",
    isAdmin: true,
    cart: [],
    receipt: [],
  },
  {
    id: "kophaiminhhoang",
    password: "vmhoafng",
    isAdmin: false,
    cart: [],
    receipt: [],
  },
  {
    id: "vmhoafng",
    password: "vmhoafng",
    isAdmin: false,
    cart: [],
    receipt: [],
  },
];
defaultUserList.forEach((user) => {
  localStorage.getItem(user.id) ||
    localStorage.setItem(user.id, JSON.stringify(user));
});
export default defaultUserList;

"use strict";

export const USER_LIST = "USER_LIST";

const defaultUserList = [
  {
    id: "Administrator",
    password: "vmhoafng",
    isAdmin: true,
    addresses: "Ho Chi Minh, VietNam",
    phoneNumber: "+84 0929829783",
    cart: [],
  },
  {
    id: "kophaiminhhoang",
    password: "vmhoafng",
    isAdmin: false,
    addresses: "Ho Chi Minh, VietNam",
    phoneNumber: "+84 0929829783",
    cart: [],
  },
  {
    id: "vmhoafng",
    password: "vmhoafng",
    isAdmin: false,
    addresses: "Ho Chi Minh, VietNam",
    phoneNumber: "+84 0929829783",
    cart: [],
  },
];
defaultUserList.forEach((user) => {
  localStorage.setItem(user.id, JSON.stringify(user));
});
export default defaultUserList;

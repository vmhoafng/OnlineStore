"use strict";

export const USER_LIST = "USER_LIST";

const defaultUserList = [
  {
    id: "Administrator",
    password: "vmhoafng",
    isAdmin: true,
    addresses: "Ho Chi Minh, VietNam",
    phoneNumber: "+84 0929829783",
    cart: [1, 2, 3],
  },
  {
    id: "kophaiminhhoang",
    password: "vmhoafng",
    isAdmin: false,
    addresses: "Ho Chi Minh, VietNam",
    phoneNumber: "+84 0929829783",
    cart: [1, 2, 3],
  },
  {
    id: "vmhoafng",
    password: "vmhoafng",
    isAdmin: false,
    addresses: "Ho Chi Minh, VietNam",
    phoneNumber: "+84 0929829783",
    cart: [1, 2, 3],
  },
];

export default defaultUserList;

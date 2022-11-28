"use strict";
export const RECEIPT_LIST = "RECEIPT_LIST";

const defaultReceiptList = [
  {
    receiptId: 1,
    userId: "kophaiminhhoang",
    status: 1,
    address: "",
    phoneNumber: "",
    cart: [],
  },
];
defaultReceiptList.forEach((receipt) => {
  localStorage.getItem(receipt.id) ||
    localStorage.setItem(receipt.id, JSON.stringify(receipt));
});
export default defaultReceiptList;

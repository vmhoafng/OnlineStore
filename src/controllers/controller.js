"use strict";

const controllers = {
  add([...list], data) {
    // spread List
    let newList = [...list];
    // add new data into ist
    newList.push(data);
    return newList;
  },
  update([...list], updateId, data) {
    // spread List
    let newList = [...list];
    newList = newList.map((value) => (value.id === updateId ? data : value));
    return newList;
  },
  delete([...list], id) {
    // spread List
    let newList = [...list];
    newList = newList.filter((item) => item.id !== id);
    return newList;
  },
};
export default controllers;

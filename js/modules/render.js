"use strict"

export const renderElement = (card) =>{
    const d = document.createElement('div');
    d.insertAdjacentHTML("beforeEnd", card);
    return d.firstElementChild;
};

export const clearHTMLItem = (item) => {
    item.innerHTML = "";
};
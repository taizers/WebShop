"use strict"

export const renderElement = (card) =>{
    const element = document.createElement('div');
    element.insertAdjacentHTML("beforeEnd", card);
    return element.firstElementChild;
};

export const clearHTMLItem = (item) => {
    item.innerHTML = "";
};
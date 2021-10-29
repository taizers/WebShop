"use strict"

const getTeg = (textTeg) =>{
    const d = document.createElement('div');
    d.insertAdjacentHTML("beforeEnd", textTeg);
    return d.firstElementChild;
};

export const fillHTMLTemplates = (wrapper, template) => {
    const fragment = document.createDocumentFragment();
    fragment.appendChild(getTeg(template));
    wrapper.appendChild(fragment);
};

export const clearHTMLItem = (item) => {
    item.innerHTML = "";
};
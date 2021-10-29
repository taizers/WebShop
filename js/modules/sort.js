"use strict";

import { productsData } from './data.js'
import { renderCatalogList } from './render-cards.js'
import { productsCopyArr } from './filters.js'

export const sortPriceBtn = document.getElementById("sort-cheap");
export const sortPopularBtn = document.getElementById("sort-popular");
export const sortDateBtn = document.getElementById("sort-new");

/* export const getsortBtns = () =>{
    const sortPriceBtn = document.getElementById("sort-cheap");
    const sortPopularBtn = document.getElementById("sort-popular");
    const sortDateBtn = document.getElementById("sort-new");
};

getsortBtns(); */

const sortProductPrice = (firstElement, SecondElement) => {
  const firstElementSort = firstElement.price;
  const SecondElementSort = SecondElement.price;
  
  return firstElementSort-SecondElementSort;
};

const sortProductDate = (firstElement, SecondElement) => {
  const firstElementSort = firstElement.publishDate;
  const SecondElementSort = SecondElement.publishDate;
  
  return firstElementSort-SecondElementSort;
};

const onSortPriceBtnClick = () => {
  renderCatalogList(productsCopyArr.sort(sortProductPrice));
};

const onSortDateBtnClick = () => {
  renderCatalogList(productsCopyArr.sort(sortProductDate).reverse());
};

const onSortPopularBtnClick = () => {
  renderCatalogList(productsData.slice());
};

sortPriceBtn.addEventListener('click',onSortPriceBtnClick); 
sortDateBtn.addEventListener('click',onSortDateBtnClick); 
sortPopularBtn.addEventListener('click',onSortPopularBtnClick); 
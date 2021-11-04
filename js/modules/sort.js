"use strict";

import { renderCatalogList } from './render-cards.js';
import { filterDataCopy } from './filters.js';
import { debounce } from './data.js';

export const sortPriceBtn = document.getElementById("sort-cheap");
export const sortPopularBtn = document.getElementById("sort-popular");
export const sortDateBtn = document.getElementById("sort-new");

/* export const getSortBtns = () =>{
    return document.querySelectorAll(".sorting__order-tab input[name=sorting-order]");
};

getsortBtns(); 
 */
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
  debounce(renderCatalogList(filterDataCopy.slice().sort(sortProductPrice)));
};

const onSortDateBtnClick = () => {
  debounce(renderCatalogList(filterDataCopy.slice().sort(sortProductDate).reverse()));
};

const onSortPopularBtnClick = () => {
  debounce(renderCatalogList(filterDataCopy.slice()));
};

export const onSortBtnsClick = () => {
  sortPriceBtn.addEventListener('click',onSortPriceBtnClick); 
  sortDateBtn.addEventListener('click',onSortDateBtnClick); 
  sortPopularBtn.addEventListener('click',onSortPopularBtnClick); 
};

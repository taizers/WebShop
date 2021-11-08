"use strict";

import { renderCatalogList } from './render-cards.js';
import { filterDataCopy } from './filters.js';
import { debounce } from './data.js';

const sortPriceBtn = document.querySelector("#sort-cheap");
const sortDateBtn =  document.querySelector("#sort-new");
const sortPopularBtn  = document.querySelector("#sort-popular");

export const getSortBtns = () => {
  let sortBtns = [];
  sortBtns.push(sortPriceBtn);
  sortBtns.push(sortDateBtn);
  sortBtns.push(sortPopularBtn);
  return sortBtns;
};

const sortProductPrice = (firstElement, secondElement) => firstElement.price - secondElement.price;

const sortProductDate = (firstElement, secondElement) => firstElement.publishDate - secondElement.publishDate;

const onSortPriceBtnClick = () => {
  debounce(renderCatalogList(filterDataCopy.slice().sort(sortProductPrice)));
};

const onSortDateBtnClick = () => {
  debounce(renderCatalogList(filterDataCopy.slice().sort(sortProductDate).reverse()));
};

const onSortPopularBtnClick = () => {
  debounce(renderCatalogList(filterDataCopy.slice()));
};

export const initSort = () => {
  sortPriceBtn.addEventListener('click', onSortPriceBtnClick);
  sortDateBtn.addEventListener('click', onSortDateBtnClick);
  sortPopularBtn.addEventListener('click', onSortPopularBtnClick);
};

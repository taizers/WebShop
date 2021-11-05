"use strict";

import { renderCatalogList } from './render-cards.js';
import { filterDataCopy } from './filters.js';
import { debounce } from './data.js';

export const getSortPriceBtn = () => {
  return document.querySelector("#sort-cheap");
};

export const getSortDateBtn = () => {
  return document.querySelector("#sort-new");
};

export const getSortPopularBtn = () => {
  return document.querySelector("#sort-popular");
};

const sortProductPrice = (firstElement, SecondElement) => {
  const firstElementSort = firstElement.price;
  const SecondElementSort = SecondElement.price;

  return firstElementSort - SecondElementSort;
};

const sortProductDate = (firstElement, SecondElement) => {
  const firstElementSort = firstElement.publishDate;
  const SecondElementSort = SecondElement.publishDate;

  return firstElementSort - SecondElementSort;
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
  getSortPriceBtn().addEventListener('click', onSortPriceBtnClick);
  getSortDateBtn().addEventListener('click', onSortDateBtnClick);
  getSortPopularBtn().addEventListener('click', onSortPopularBtnClick);
};

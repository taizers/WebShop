"use strict";

import { renderCatalogList } from './render-cards.js'
import { productsData } from './data.js'
import { fillHTMLTemplates, clearHTMLItem } from './render.js'

const filterForm = document.querySelector(".filter").querySelector("form"); 

const getSliderValues = (value) => {
    return value.split(',').map(item => +item);
};

const getFilterRoomsResult = (value) =>{
  let count = 0;
  switch (value) {
    case "one":
      count = 1;
      break;
    case "two":
      count = 2;
      break;
    case "three":
      count = 3;
      break;
    case "four":
      count = 4;
      break;
    case "fivemore":
      count = 5;
      break;
    default:
      count = 0;
      break;
  }
  console.log(count);
  return count;
};

const getTypes = (filterFormData) => {
  let typesArr = [];
  for (let [name, value] of filterFormData) {
    if (name === "estate-type") {
      typesArr.push(value);
    }
  }
  return typesArr;
};

const getElementsOnType = (elements, filterFormData) => {
  let arr = [];
  const typesArr = getTypes(filterFormData);
  elements.forEach(element => {
    if (typesArr.includes(element.filters.type)) {
      arr.push(element);
    }
  });
  return arr;
};

const getElementsOnMinArea = (elements, minArea) =>{
  let arr = [];
  elements.forEach(element => {
    if (element.filters.area > minArea) {
      arr.push(element);
    }
  });
  return arr;
};

const getElementsOnPrice = (elements, values) =>{
    let arr = [];
    const minPrice = values[0];
    const maxPrice = values[1];
    elements.forEach(element => {
      if (element.price > minPrice && element.price < maxPrice) {
        arr.push(element);
      }
    });
    return arr;
  };

const getElementsOnCountRooms = (elements, filterRoomsValue) => {
  let arr = [];
  if (filterRoomsValue === 0) {
    arr = elements;
  }else{
    if (filterRoomsValue != 5) {
      elements.forEach(element => {
        if (element.filters.roomsCount === filterRoomsValue) {
          arr.push(element);
        }
      });
    }
    else{
      elements.forEach(element => {
        if (element.filters.roomsCount >= filterRoomsValue) {
          arr.push(element);
        }
      });
    }
  }
  return arr;
};

const notFound = `<p style="text-align:center">Мы не нашли товары по вашему запросу. Попробуйте поменять
фильтры настройки объявлений в блоке слева</p>`;

const onFilterFormSubmit = (evt) => {
  evt.preventDefault();
  let productsFilterArr = productsData.slice(0, MAX_VIEW_PRODUCT_COUNT);
  const filterFormData = new FormData(filterForm);
  if (filterFormData.has("sampleSlider")) {
    productsFilterArr = getElementsOnPrice(productsFilterArr, getSliderValues(filterFormData.get("sampleSlider")));
    
    //filterFormData.get("sampleSlider");
  }
  if (filterFormData.has("estate-type")) {
    productsFilterArr = getElementsOnType(productsFilterArr, filterFormData);
  }
  if (filterFormData.has("min-square") && filterFormData.get("min-square") != "") {
    productsFilterArr = getElementsOnMinArea(productsFilterArr, filterFormData.get("min-square"));
  }
  if (filterFormData.has("rooms")) {
    productsFilterArr = getElementsOnCountRooms(productsFilterArr,getFilterRoomsResult(filterFormData.get("rooms")));
  }
  if (productsFilterArr.length != 0) {
    productsCopyArr = productsFilterArr;
    renderCatalogList();
  }else{
    clearHTMLItem(catalogList);
    fillHTMLTemplates(catalogList,notFound);
  }

};

filterForm.addEventListener("submit", onFilterFormSubmit);

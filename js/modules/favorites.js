"use strict";

import { sortDateBtn, sortPriceBtn, sortPopularBtn } from './sort.js';
import { filterForm} from './filters.js';
import { renderCatalogList, catalogList, getCardContentData } from './render-cards.js';
import { renderElement, clearHTMLItem } from './render.js';
import { debounce } from './data.js';

let favoriteData = [];
const favoriteBtn = document.querySelector(".sorting__favourites");

const notFound = `<p style="text-align:center">«У вас пока нет избранных товаров. Чтобы
  отметить товар, кликните на сердечко в карточке объявления. Вы можете
  вернуться к списку всех товаров, кликнув ещё раз на «Показать
  избранные»</p>`; 

const disableSortElements = () =>{
  sortPriceBtn.disabled = false;
  sortPopularBtn.disabled = false;
  sortDateBtn.disabled = false;
  document.getElementById("square").disabled = false;
  document.querySelectorAll(".rs-pointer").forEach(element => {
    element.disabled = false;
  });
  filterForm.childNodes.forEach(element => {
    element.disabled = false;
    element.childNodes.forEach(elementChild => {
      elementChild.disabled = false;
    });
  });
};

const turningOnSortElements = () =>{
  sortPriceBtn.disabled = true;
  sortPopularBtn.disabled = true;
  sortDateBtn.disabled = true;
  document.getElementById("square").disabled = true;
  document.querySelectorAll(".rs-pointer").forEach(element => {
    element.disabled = true;
  });
  filterForm.childNodes.forEach(element => {
    element.disabled = true;
    element.childNodes.forEach(elementChild => {
      elementChild.disabled = true;
    });
  });
};

const setproductsDataStorage = (cards) => {
  localStorage.setItem('cards', JSON.stringify(cards));
};

export const getproductsDataStorage = () => {
  return JSON.parse(localStorage.getItem('cards'));
};

const onFavoritesRemove = (cardData, elem) => {
  const productsDataStorage = getproductsDataStorage() || [];
  
  if ((productsDataStorage != null && getCardContentData(productsDataStorage, cardData.card_id) != null)) {
    elem.classList.remove("fav-add--checked");
    productsDataStorage.splice(productsDataStorage.indexOf(cardData), 1);
  }

  setproductsDataStorage(productsDataStorage)
};

const onFavoritesAdd = (cardData, elem) => {
  const productsDataStorage = getproductsDataStorage() || [];
  
  if ( !((productsDataStorage != null && getCardContentData(productsDataStorage, cardData.card_id) != null)) ) {
    elem.classList.add("fav-add--checked");
    productsDataStorage.push(cardData);
  }

  setproductsDataStorage(productsDataStorage)
};

const toggleFavorite = (cardDataItem) =>{
  cardDataItem.favorite = !cardDataItem.favorite;
};

export const setFavoriteStatus = (cardDataItem, elemetTarget) => {
  if (cardDataItem.favorite) {
    toggleFavorite(cardDataItem);
    onFavoritesRemove(cardDataItem, elemetTarget);
  }else{
    toggleFavorite(cardDataItem);
    onFavoritesAdd(cardDataItem, elemetTarget);
  }
};

const toggleFavoriteView = () =>{
  let favoriteDataCopy = favoriteData;
  if (!document.getElementById("favourites").checked) {
    document.querySelector('#sort-popular').checked = true;
    renderCatalogList(favoriteDataCopy);
    disableSortElements();
  }
  else{
    favoriteDataCopy = getproductsDataStorage();
    turningOnSortElements();
    
    if (favoriteDataCopy != null && favoriteDataCopy.length != 0) {
      renderCatalogList(favoriteDataCopy);
    }
    else{
      clearHTMLItem(catalogList);
      catalogList.insertAdjacentElement("beforeEnd", renderElement(notFound));
    }
  }
};

const onFavoritesBtnClick = () =>{
  debounce(toggleFavoriteView());
};

const initListener = () => {
  favoriteBtn.addEventListener("click", onFavoritesBtnClick);   
};
   
export const initFavorite = (cardsData) => {
    favoriteData = cardsData;
    initListener();
};
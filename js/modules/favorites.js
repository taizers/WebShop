"use strict";

import { filterDataCopy } from './filters.js';
import { renderCatalogList, catalogList, getCardContentData } from './render-cards.js';
import { renderElement, clearHTMLItem } from './render.js';
import { debounce } from './data.js';
import { getSortBtns } from './sort.js';

const favoriteBtn = document.querySelector(".sorting__favourites");
const sortBtns = getSortBtns();

const notFound = `<p style="text-align:center">«У вас пока нет избранных товаров. Чтобы
  отметить товар, кликните на сердечко в карточке объявления. Вы можете
  вернуться к списку всех товаров, кликнув ещё раз на «Показать
  избранные»</p>`;

const disableSortElements = () => {
  sortBtns.forEach(element => {
    element.disabled = false;
  });

  document.querySelector("#square").disabled = false;

  document.querySelector(".js-filter").childNodes.forEach(element => {
    element.disabled = false;
    element.childNodes.forEach(elementChild => {
      elementChild.disabled = false;
    });
  });
};

const turningOnSortElements = () => {
  sortBtns.forEach(element => {
    element.disabled = true;
  });

  document.querySelector("#square").disabled = true;

  document.querySelector(".js-filter").childNodes.forEach(element => {
    element.disabled = true;
    element.childNodes.forEach(elementChild => {
      elementChild.disabled = true;
    });
  });
};

const setProductsDataStorage = (cards) => {
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

  setProductsDataStorage(productsDataStorage)
};

const onFavoritesAdd = (cardData, elem) => {
  const productsDataStorage = getproductsDataStorage() || [];

  if (!((productsDataStorage != null && getCardContentData(productsDataStorage, cardData.card_id) != null))) {
    elem.classList.add("fav-add--checked");
    productsDataStorage.push(cardData);
  }

  setProductsDataStorage(productsDataStorage);
};

export const setFavoriteStatus = (cardDataItem, elemetTarget) => {
  if (cardDataItem.favorite) {
    cardDataItem.favorite = !cardDataItem.favorite;
    onFavoritesRemove(cardDataItem, elemetTarget);
  } else {
    cardDataItem.favorite = !cardDataItem.favorite;
    onFavoritesAdd(cardDataItem, elemetTarget);
  }
};

const toggleFavoriteView = () => {
  let favoriteDataCopy = filterDataCopy.slice();
  if (!document.getElementById("favourites").checked) {
    document.querySelector('#sort-popular').checked = true;
    renderCatalogList(favoriteDataCopy);
    disableSortElements();
  }
  else {
    favoriteDataCopy = getproductsDataStorage();
    turningOnSortElements();

    if (favoriteDataCopy != null && favoriteDataCopy.length != 0) {
      renderCatalogList(favoriteDataCopy);
    }
    else {
      clearHTMLItem(catalogList);
      catalogList.insertAdjacentElement("beforeEnd", renderElement(notFound));
    }
  }
};

const onFavoritesBtnClick = () => {
  debounce(toggleFavoriteView());
};

export const initFavorite = () => {
  favoriteBtn.addEventListener("click", onFavoritesBtnClick);
};

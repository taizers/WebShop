"use strict";

import { sortDateBtn, sortPriceBtn, sortPopularBtn } from './sort.js';
import { filterForm} from './filters.js';
import { renderCatalogList,catalogList } from './render-cards.js';
import { getproductsDataStorage } from './open-modal.js';
import { fillHTMLTemplates, clearHTMLItem } from './render.js';

const notFound = `<p style="text-align:center">«У вас пока нет избранных товаров. Чтобы
отметить товар, кликните на сердечко в карточке объявления. Вы можете
вернуться к списку всех товаров, кликнув ещё раз на «Показать
избранные»</p>`; 

const disableSortElements = () =>{
  sortPriceBtn.disabled = false;
  sortPopularBtn.disabled = false;
  sortDateBtn.disabled = false;
  document.getElementById("square").disabled = false;
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
  filterForm.childNodes.forEach(element => {
    element.disabled = true;
    element.childNodes.forEach(elementChild => {
      elementChild.disabled = true;
    });
  });
};

export const setFavorite = (cardsData, setFavoritStatus) =>{
  if (!document.getElementById("favourites").checked) {
    renderCatalogList(cardsData, setFavoritStatus);
    disableSortElements();
  }
  else{
    const productsDataStorage = getproductsDataStorage();
    turningOnSortElements();
    
    if (productsDataStorage != null) {
      renderCatalogList(productsDataStorage, setFavoritStatus);
    }
    else{
      clearHTMLItem(catalogList);
      fillHTMLTemplates(catalogList,notFound);
    }
  }
};

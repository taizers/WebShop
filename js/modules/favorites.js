"use strict";

import { renderCatalogList  } from './render-cards.js'
import { sortDateBtn, sortPriceBtn, sortPopularBtn } from './sort.js'
import { productsData, productsCopyArr } from './data.js'
import { getproductsDataStorage} from './open-module.js'
import { fillHTMLTemplates, clearHTMLItem } from './render.js'


const sortingFavoritesBtn = document.querySelector(".sorting__favourites");

const notFound = `<p style="text-align:center">«У вас пока нет избранных товаров. Чтобы
отметить товар, кликните на сердечко в карточке объявления. Вы можете
вернуться к списку всех товаров, кликнув ещё раз на «Показать
избранные»</p>`;

const onFavoritesBtnClick = () => {
   
  if (!document.getElementById("favourites").checked) {
    productsCopyArr = productsData.slice();
    renderCatalogList();
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
  }
  else{
    const productsDataStorage = getproductsDataStorage();
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
    if (productsDataStorage != null) {
      productsCopyArr = productsDataStorage;
      renderCatalogList();
    }
    else{
      clearHTMLItem(catalogList);
      fillHTMLTemplates(catalogList,notFound);
    }
  }

};

sortingFavoritesBtn.addEventListener("click", onFavoritesBtnClick);
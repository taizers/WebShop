"use strict";

import { productsCopyArr } from './data.js'
import { onShowModalClick, onFavoritesClick, getCardContentData, getproductsDataStorage, getProductsDate, numberWithSpaces, CURRENCY } from './open-module.js'
import { fillHTMLTemplates, clearHTMLItem } from './render.js'

const catalogList = document.querySelector('.results__list');

const productCard = (productData) =>{ 
    const textTeg = `
        <li class="results__item product" id = "${productData.card_id}">
            <button class="product__favourite fav-add ${(getproductsDataStorage() != null && getCardContentData(getproductsDataStorage(),productData.card_id) != null) ? "fav-add--checked" : ""} " type="button" aria-label="Добавить в избранное">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="product__image">
                <img src="${productData.photos[0]}" width="318" height="220" alt="${productData.name}">
            </div>
            <div class="product__content">
                <h3 class="product__title">
                    <a href="#">${productData.name}</a>
                </h3>
                <div class="product__price">${numberWithSpaces(productData.price)} ${CURRENCY}</div>
                <div class="product__address">${productData.address.city}, ${productData.address.street}</div>
                <div class="product__date">${getProductsDate(productData.publishDate)}</div>
            </div>
        </li>
    `;
    return textTeg;
};

const onCardClick = (evt) => {
    if (evt.target === evt.currentTarget.querySelector('img') || evt.target === evt.currentTarget.querySelector('a')) {
      evt.preventDefault();
      onShowModalClick(getCardContentData(productsData.slice(), evt.currentTarget.id));
    }
    console.log(evt.target + "    1");
    console.log(evt.currentTarget.querySelector(".product__favourite") + "    2");
    if (evt.target == evt.currentTarget.querySelector(".product__favourite")) {
      onFavoritesClick(getCardContentData(productsData.slice(), evt.currentTarget.id),evt.currentTarget.querySelector(".product__favourite"));
    }
};

const removeEventListenerCards = (cardsItems) => {
    cardsItems.forEach((card) => {
      card.removeEventListener('click', onCardClick)
    });
};
 
const addEventListenerCards = (cardsItems) =>{
    cardsItems.forEach((card) => {
      card.addEventListener('click', onCardClick)
    });
};

export const renderCatalogList = () => {
    removeEventListenerCards(catalogList.querySelectorAll('.results__item'));
  
    clearHTMLItem(catalogList);
  
    productsCopyArr.slice(0, MAX_VIEW_PRODUCT_COUNT).forEach((it) => {
      fillHTMLTemplates(catalogList,productCard(it));
    });
  
    addEventListenerCards(catalogList.querySelectorAll('.results__item'));
};

renderCatalogList();
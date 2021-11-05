"use strict";

import { onShowModalClick } from './open-modal.js';
import { clearHTMLItem, renderElement } from './render.js';
import { setFavoriteStatus, getproductsDataStorage } from './favorites.js';
import { getProductsDate, numberWithSpaces} from './redactdata.js';

export const catalogList = document.querySelector('.results__list');
let cardsDataCopy = [];

export const getCardContentData = (list, id) => {
    for (let item of list) {
        if (item.card_id === id) {
        return item;
        }
    }
};

const getFavoriteClass = (favoriteValueCard, cardId) => {
    if (favoriteValueCard && getproductsDataStorage() != null && getCardContentData(getproductsDataStorage(),cardId) != null) {
        return null;
    }else{
        if (favoriteValueCard && getCardContentData(getproductsDataStorage(),cardId) != null) {
            return true;
        }else{
            return false;
        }
    }
};

const getProductCardSample = (productData) =>{ 
    const card = `
        <li class="results__item product" data-id = "${productData.card_id}">
            <button class="product__favourite fav-add ${getFavoriteClass(productData.favorite,productData.card_id) === null ? "fav-add--checked" : productData.favorite = getFavoriteClass(productData.favorite,productData.card_id)} " type="button" aria-label="Добавить в избранное">
                <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
                </svg>
            </button>
            <div class="product__image">
                <img src="${productData.photos != null ? productData.photos[0] : ""}" width="318" height="220" alt="${productData.name != null ? productData.name : ""}">
            </div>
            <div class="product__content">
                <h3 class="product__title">
                    <a href="#">${productData.name != null ? productData.name : ""}</a>
                </h3>
                <div class="product__price">${numberWithSpaces(productData.price)}</div>
                <div class="product__address">${productData.address.city}, ${productData.address.street}</div>
                <div class="product__date">${getProductsDate(productData.publishDate)}</div>
            </div>
        </li>
    `;
    return card;
};

const onCardClick = (evt) => {
    if (evt.target === evt.currentTarget.querySelector('img') || evt.target === evt.currentTarget.querySelector('a')) {
      evt.preventDefault();
      onShowModalClick(getCardContentData(cardsDataCopy, evt.currentTarget.getAttribute('data-id')));
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

const onHeardClick = (evt) =>{
    const card = evt.currentTarget;
    setFavoriteStatus(getCardContentData(cardsDataCopy, card.parentElement.getAttribute('data-id')), card);
};

const addEventListenerFavorite = (heards) =>{
    heards.forEach(element => {
        element.addEventListener("click",onHeardClick);
    });
};

const getLikeBtns = () =>{
    return catalogList.querySelectorAll(".product__favourite");
};

export const renderCatalogList = (cardsData) => {
    cardsDataCopy = cardsData;
    clearHTMLItem(catalogList);
    removeEventListenerCards(catalogList.querySelectorAll('.results__item'));

    console.log(cardsData);

    const fragment = document.createDocumentFragment();

    cardsData.forEach((it) => {
      const card = renderElement(getProductCardSample(it));
      fragment.appendChild(card);
    });

    catalogList.appendChild(fragment);

    //const heards = catalogList.querySelectorAll(".product__favourite");

    addEventListenerFavorite(getLikeBtns());
    addEventListenerCards(catalogList.querySelectorAll('.results__item'));
};

"use strict";

import { onShowModalClick,  getCardContentData, getProductsDate, numberWithSpaces, CURRENCY } from './open-modal.js';
import { fillHTMLTemplates, clearHTMLItem } from './render.js';

export const catalogList = document.querySelector('.results__list');

const productCard = (productData) =>{ 
    const textTeg = `
        <li class="results__item product" id = "${productData.card_id}">
            <button class="product__favourite fav-add ${(productData.favorite) ? "fav-add--checked" : ""} " type="button" aria-label="Добавить в избранное">
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


 
export const renderCatalogList = (productsData, setFavoritStatus) => {

    clearHTMLItem(catalogList);

    console.log(productsData);

    productsData.forEach((it) => {//тут заменил копирование
      fillHTMLTemplates(catalogList,productCard(it));
    });

    const onCardClick = (evt) => {
        if (evt.target === evt.currentTarget.querySelector('img') || evt.target === evt.currentTarget.querySelector('a')) {
          evt.preventDefault();
          onShowModalClick(getCardContentData(productsData, evt.currentTarget.id),setFavoritStatus);
        }
    };

    const removeEventListenerCards = (cardsItems) => {
        cardsItems.forEach((card) => {
          card.removeEventListener('click', onCardClick)
        });
    };

    removeEventListenerCards(catalogList.querySelectorAll('.results__item'));

    const heards = catalogList.querySelectorAll(".product__favourite");
        
    const onHeardClick = (evt) =>{
        const card = evt.currentTarget;
        setFavoritStatus(card.parentElement.id, card);
    };

    heards.forEach(element => {
        element.addEventListener("click",onHeardClick);
    });

    const addEventListenerCards = (cardsItems) =>{
        cardsItems.forEach((card) => {
          card.addEventListener('click', onCardClick)
        });
    };
    addEventListenerCards(catalogList.querySelectorAll('.results__item'));
};

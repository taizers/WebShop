"use strict";

import { productsData } from './data.js'

export const CURRENCY = "₽";
const ONE_DAY_IN_MS = 86400000;
const TWO_DAYS_IN_MS = 172800000;

const renderPhotos = (photos, name) => {
    let images = "";
    photos.forEach((element, index) => {
      images += `
        <li class="gallery__item ${ (index === 0) ? "gallery__item--active" : ""}">
          <img src="${element}" width="124" height="80" alt="${name}">
        </li>
      `;
    });
    return images;
};

export const getProductsDate = (productDate) => {
    const date = Date.now();
    if (productDate <= date && productDate > date - ONE_DAY_IN_MS) {
        return "Сегодня";
    } else
    if (productDate <= date - ONE_DAY_IN_MS && productDate > date - TWO_DAYS_IN_MS) {
        return "Вчера";
    }else
    {
        return `${new Date(productDate).getDay() + 1} ${months[new Date(productDate).getMonth()]} ${new Date(productDate).getFullYear()} года`;
    };
};

export const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

export const getproductsDataStorage = () => {
    return JSON.parse(localStorage.getItem('cards'));
};

const setproductsDataStorage = (cards) => {
    localStorage.setItem('cards', JSON.stringify(cards));
};

export const getCardContentData = (list, id) => {
    for (let item of list) {
        if (item.card_id === id) {
        return item;
        }
    }
};

export const onFavoritesClick = (cardData, elem) => {
    const productsDataStorage = getproductsDataStorage() || [];
    
    if ((productsDataStorage != null && getCardContentData(productsDataStorage, cardData.card_id) != null)) {
      elem.classList.remove("fav-add--checked");
      productsDataStorage.splice(productsDataStorage.indexOf(cardData), 1);
    }else{
      elem.classList.add("fav-add--checked");
      productsDataStorage.push(cardData);
    }
  
    setproductsDataStorage(productsDataStorage)
};

const productEventCard = (productData) =>{ 
  const textTeg = `
  <div class="popup__inner  ">
    <button class="popup__close" type="button" aria-label="Закрыть">
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"/>
      </svg>
    </button>
    <div class="popup__date">${getProductsDate(productData.publishDate)}</div>
    <h3 class="popup__title">${productData.name}</h3>
    <div class="popup__price">${numberWithSpaces(productData.price)} ${CURRENCY}</div>
    <div class="popup__columns">
      <div class="popup__left">
        <div class="popup__gallery gallery">
          <button id= "${productData.card_id + "p"}" class="gallery__favourite fav-add ${(getproductsDataStorage() != null && getCardContentData(getproductsDataStorage(),productData.card_id) != null) ? "fav-add--checked" : ""}">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="gallery__main-pic">
            <img src="${productData.photos[0]}" width="520" height="340" alt="${productData.name}">
          </div>
          <ul class="gallery__list">
          ${renderPhotos(productData.photos, productData.name)}
          </ul>
        </div>
        <ul class="popup__chars chars">
          ${productData.filters.area != "" ?  
            `<li class="chars__item">
              <div class="chars__name">Площадь</div>
              <div class="chars__value">${productData.filters.area}</div>
            </li>`
            : ""
          }
          ${productData.filters.roomsCount != "" ?  
            `<li class="chars__item">
              <div class="chars__name">Количество комнат</div>
              <div class="chars__value">${productData.filters.roomsCount}</div>
            </li>`
            : ""
          }
          ${productData.filters.type != "" ?  
            `<li class="chars__item">
              <div class="chars__name">Тип недвижимости</div>
              <div class="chars__value">${productData.filters.type}</div>
            </li>`
            : ""
          }
        </ul>
        <div class="popup__seller seller seller--good">
          <h3>Продавец</h3>
          <div class="seller__inner">
            <a class="seller__name" href="#">${productData.seller.fullName}</a>
            <div class="seller__rating"><span>${productData.seller.rating}</span></div>
          </div>
        </div>
        <div class="popup__description">
          <h3>Описание товара</h3>
          <p>${productData.description}</p>
        </div>
      </div>
      <div class="popup__right">
        <div class="popup__map">
          <img src="img/map.jpg" width="268" height="180" alt="${productData.address.city}, ${productData.address.street}, дом ${productData.address.building}">
        </div>
        <div class="popup__address">${productData.address.city}, ${productData.address.street}, дом ${productData.address.building}</div>
      </div>
    </div>
  </div>
`;
  return textTeg;
};


const addSwapOnGalery = (evt) =>{
    const galeryMainImage = modal.querySelector(".gallery__main-pic");
  
    findGaleryImages().forEach(image => {
      image.classList.remove("gallery__item--active");
    });
  
    evt.currentTarget.classList.add("gallery__item--active");
    galeryMainImage.firstElementChild.src = evt.target.src;
};
  
const findCloseButton = () => {
    const modalCloseBtn = modal.querySelector(".popup__close");
    return modalCloseBtn;
};
  
const findGaleryImages = () => {
    const galeryImages = modal.querySelectorAll(".gallery__item");
    return galeryImages;
};
  
const findGaleryImageFavorite = () => {
    return  modal.querySelector(".gallery__favourite");
};
  
const openModal = () => {
    modal.classList.add("popup--active");
};
  
const closeModal = () => {
    modal.classList.remove("popup--active");
};
  
const onCloseBtnClick = () => {
    removeModalListeners(findCloseButton(), findGaleryImageFavorite());
    closeModal();
};
  
export const onShowModalClick = (cardData) => {
    clearHTMLItem(modal);
    fillHTMLTemplates(modal, productEventCard(cardData))
    initModalListeners(findCloseButton(), findGaleryImageFavorite());
    openModal();
};
  
const onModalMoveOutClose = () => {
    document.removeEventListener('keydown',onModalKeyDownClose);
    document.removeEventListener('mouseout',onModalMoveOutClose);
};
  
const onModalKeyDownClose = (evt) => {
    if (evt.key === "Enter") {
      evt.preventDefault();
      onCloseBtnClick();
    };
};
  
const onCloseBtnMove = (evt) => {
    document.addEventListener('keydown',onModalKeyDownClose);
    document.addEventListener('mouseout',onModalMoveOutClose);
};
  
const onModalKeyDown = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      onCloseBtnClick();
    };
};
  
const onModalOutLineClick = (evt) =>{
    if (evt.target === modal) {
        onCloseBtnClick();
    }
};

const synhCardAndModal = (id) => {
    const card = document.getElementById(id).querySelector(".product__favourite");
    card.classList.contains("fav-add--checked") ? card.classList.remove("fav-add--checked") :card.classList.add("fav-add--checked");
  
};
  
const onModalFavoriteClick = (evt) => {
    console.log(evt.target + "    2-1");
    console.log(evt.currentTarget + "    2-2");
    if (evt.target == evt.currentTarget) {
      onFavoritesClick(getCardContentData(productsData.slice(), evt.currentTarget.id.slice(0, -1)),evt.currentTarget);
      synhCardAndModal(evt.currentTarget.id.slice(0, -1));
    }
};

const initModalListeners = (modalCloseBtn, favoriteBtn) => {  
    favoriteBtn.addEventListener("click",onModalFavoriteClick);
    findGaleryImages().forEach(item => {
      item.addEventListener('click', addSwapOnGalery)
    });
    modalCloseBtn.addEventListener("click",onCloseBtnClick);
    modalCloseBtn.addEventListener("mouseover",onCloseBtnMove);
    document.addEventListener('keydown',onModalKeyDown); 
    window.addEventListener("click",onModalOutLineClick);
};
const removeModalListeners = (modalCloseBtn, favoriteBtn) => {
    favoriteBtn.removeEventListener("click",onModalFavoriteClick);
    findGaleryImages().forEach(item => {
      item.removeEventListener('click', addSwapOnGalery)
    });
    modalCloseBtn.removeEventListener("click",onCloseBtnClick);
    modalCloseBtn.removeEventListener("mouseover",onCloseBtnMove);
    document.removeEventListener('keydown',onModalKeyDown); 
    window.removeEventListener("click",onModalOutLineClick);
};
"use strict";

import { clearHTMLItem, renderElement } from './render.js';
import { getProductsDate, numberWithSpaces } from './redactdata.js';
import { setFavoriteStatus } from './favorites.js';

const modal = document.querySelector(".popup");
let cardDataCopyForSynch = [];

const renderPhotos = (photos, name) => {
  let images = "";
  photos.forEach((element, index) => {
    images += `
        <li class="gallery__item ${(index === 0) ? "gallery__item--active" : ""}">
          <img src="${element}" width="124" height="80" alt="${name}">
        </li>
      `;
  });
  return images;
};

const getTypeProduct = (cardType) => {
  switch (cardType) {
    case "house":
      return "Дом";
    case "flat":
      return "Квартира";
    case "apartment":
      return "Апартаменты";
  }
};

const getProductModalSample = (productData) => {
  const card = `
  <div class="popup__inner">
    <button class="popup__close" type="button" aria-label="Закрыть">
      <svg width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L8 6.58579L14.2929 0.292893C14.6834 -0.0976311 15.3166 -0.0976311 15.7071 0.292893C16.0976 0.683418 16.0976 1.31658 15.7071 1.70711L9.41421 8L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L8 9.41421L1.70711 15.7071C1.31658 16.0976 0.683418 16.0976 0.292893 15.7071C-0.0976311 15.3166 -0.0976311 14.6834 0.292893 14.2929L6.58579 8L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893Z"/>
      </svg>
    </button>
    <div class="popup__date">${getProductsDate(productData.publishDate)}</div>
    <h3 class="popup__title">${productData.name != null ? productData.name : ""}</h3>
    <div class="popup__price">${numberWithSpaces(productData.price)}</div>
    <div class="popup__columns">
      <div class="popup__left">
        <div class="popup__gallery gallery">
          <button class="gallery__favourite fav-add ${(productData.favorite) ? "fav-add--checked" : ""}">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="gallery__main-pic">
            <img src="${productData.photos != null ? productData.photos[0] : ""}" width="520" height="340" alt="${productData.name != null ? productData.name : ""}">
          </div>
          <ul class="gallery__list">
          ${productData.photos != null ? renderPhotos(productData.photos, productData.name) : ""}
          </ul>
        </div>
        <ul class="popup__chars chars">
          ${productData.filters.area != null ?
      `<li class="chars__item">
              <div class="chars__name">Площадь</div>
              <div class="chars__value">${productData.filters.area}</div>
            </li>`
      : ""
    }
          ${productData.filters.roomsCount != null ?
      `<li class="chars__item">
              <div class="chars__name">Количество комнат</div>
              <div class="chars__value">${productData.filters.roomsCount}</div>
            </li>`
      : ""
    }
          ${productData.filters.type != null ?
      `<li class="chars__item">
              <div class="chars__name">Тип недвижимости</div>
              <div class="chars__value">${getTypeProduct(productData.filters.type)}</div>
            </li>`
      : ""
    }
        </ul>
        <div class="popup__seller seller ${productData.seller.rating > 4 ? "seller--good" : "seller--bad"}">
          ${productData.seller.fullname != null || productData.seller.rating != null ?
      ` <h3>Продавец</h3>
              <div class="seller__inner">
                <a class="seller__name" href="#">${productData.seller.fullname != null ? productData.seller.fullname : ""}</a>
                <div class="seller__rating"><span>${productData.seller.rating != null ? productData.seller.rating : ""}</span></div>
              </div>`
      : ""
    }

        </div>
        <div class="popup__description">
          ${productData.description != null ?
      `<h3>Описание товара</h3>
            <p>${productData.description}</p>`
      : ""
    }
        </div>
      </div>
      <div class="popup__right">
          ${productData.coordinates[0] != null && productData.coordinates[1] != null ?
      `<div class="popup__map" id="map">`
      : ""
    }
        </div>
        <div class="popup__address">${productData.address.city}, ${productData.address.street}, ${productData.address.building}</div>
      </div>
    </div>
  </div>
`;
  return card;
};

const addSwapOnGalery = (evt) => {
  const galeryMainImage = modal.querySelector(".gallery__main-pic");

  findGaleryImages().forEach(image => {
    image.classList.remove("gallery__item--active");
  });

  evt.currentTarget.classList.add("gallery__item--active");
  galeryMainImage.firstElementChild.src = evt.target.src;
};

const findCloseButton = () => {
  return modal.querySelector(".popup__close");
};

const findGaleryImages = () => {
  return modal.querySelectorAll(".gallery__item");
};

const findGaleryImageFavorite = () => {
  return modal.querySelector(".gallery__favourite");
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

const initMap = (cardData) => {
  if (cardData.coordinates[0] != null && cardData.coordinates[1] != null) {
    const mapOptions = {
      center: [cardData.coordinates[0], cardData.coordinates[1]],
      setView: [cardData.coordinates[0], cardData.coordinates[1]],
      zoom: 14
    }
    let map = new L.map('map', mapOptions);
    const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="copyright">Openstreetmap</a>'
    }).addTo(map);
    const marker = L.marker([cardData.coordinates[0], cardData.coordinates[1]]).addTo(map);
    map.panTo(new L.LatLng(cardData.coordinates[0], cardData.coordinates[1]));
  };
};

export const onShowModalClick = (cardData) => {
  clearHTMLItem(modal);
  modal.insertAdjacentElement("beforeEnd", renderElement(getProductModalSample(cardData)));
  initModalListeners(findCloseButton(), findGaleryImageFavorite(), cardData);
  initMap(cardData);
  openModal();
};

const onModalMoveOutClose = () => {
  document.removeEventListener('keydown', onModalKeyDownClose);
  document.removeEventListener('mouseout', onModalMoveOutClose);
};

const onModalKeyDownClose = (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    onCloseBtnClick();
  };
};

const onCloseBtnMove = (evt) => {
  document.addEventListener('keydown', onModalKeyDownClose);
  document.addEventListener('mouseout', onModalMoveOutClose);
};

const onModalKeyDown = (evt) => {
  if (evt.key === "Escape") {
    evt.preventDefault();
    onCloseBtnClick();
  };
};

const onModalOutLineClick = (evt) => {
  if (evt.target === modal) {
    onCloseBtnClick();
  }
};

const synhCardAndModal = (id) => {
  let like = document.createElement('div');
  document.querySelectorAll('.results__item').forEach(element => {
    if (element.getAttribute('data-id') === id) {
      like = element.querySelector(".product__favourite");
    }
  });

  like.classList.contains("fav-add--checked") ? like.classList.remove("fav-add--checked") : like.classList.add("fav-add--checked");
};

const  onModalFavoriteClick = (evt) => {
  setFavoriteStatus(cardDataCopyForSynch, evt.currentTarget);
  synhCardAndModal(cardDataCopyForSynch.card_id);
};

const initModalListeners = (modalCloseBtn, favoriteBtn, cardData) => {
  cardDataCopyForSynch = cardData;

  favoriteBtn.addEventListener("click", onModalFavoriteClick);

  findGaleryImages().forEach(item => {
    item.addEventListener('click', addSwapOnGalery)
  });

  modalCloseBtn.addEventListener("click", onCloseBtnClick);
  modalCloseBtn.addEventListener("mouseover", onCloseBtnMove);

  document.addEventListener('keydown', onModalKeyDown);
  window.addEventListener("click", onModalOutLineClick);
};
const removeModalListeners = (modalCloseBtn, favoriteBtn) => {
  favoriteBtn.removeEventListener("click", onModalFavoriteClick);

  findGaleryImages().forEach(item => {
    item.removeEventListener('click', addSwapOnGalery)
  });

  modalCloseBtn.removeEventListener("click", onCloseBtnClick);
  modalCloseBtn.removeEventListener("mouseover", onCloseBtnMove);

  document.removeEventListener('keydown', onModalKeyDown);
  window.removeEventListener("click", onModalOutLineClick);
};

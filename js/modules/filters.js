"use strict";

import '../lib/rSlider.min.js';
import { renderCatalogList, catalogList } from './render-cards.js';
import { renderElement, clearHTMLItem } from './render.js';
import { debounce } from './data.js';

const MIN_PRICE = 1000000;
const MAX_PRICE = 30000000;

let filterData = [];
export let filterDataCopy = [];
const filterForm = document.querySelector(".js-filter");

const getSliderValues = () => {
  const pricesValues = [];
  for (let i = MIN_PRICE; i < MAX_PRICE + 1; i += 10000) {
      pricesValues.push(i);
  }
  return pricesValues;
};

const mySlider = new rSlider({
  target: '#sampleSlider',
  set: [MIN_PRICE, MAX_PRICE],
  values: getSliderValues(),
  range: true,
  tooltip: true,
  scale: true,
  labels: true,
  step: 10000,
});

const getSliderRange = (value) => {
  return value.split(',').map(item => +item);
};

const checkCardRooms = (cardRoomsCount, filterRoomsCount) => {
  switch (filterRoomsCount) {
    case 'one':
      return cardRoomsCount === 1;
    case 'two':
      return cardRoomsCount === 2;
    case 'three':
      return cardRoomsCount === 3;
    case 'four':
      return cardRoomsCount === 4;
    case 'fivemore':
      return cardRoomsCount >= 5;
    default: return true;
  }
};

const notFound = `<p style="text-align:center">Мы не нашли товары по вашему запросу. Попробуйте поменять
фильтры настройки объявлений в блоке слева</p>`;

const checkCardPrice = (cardPrice, filterPrice) => {
  return (cardPrice >= filterPrice[0] && cardPrice <= filterPrice[1]) || cardPrice === 0 || cardPrice === null;
};

const checkCardType = (cardType, house, flat, apartments) => {
  if (house || flat || apartments) {
    switch (cardType) {
      case "house":
        return house;
      case "flat":
        return flat;
      case "apartment":
        return apartments;
    }
  }
  else return true;
};

const getFiltersData = () => {
  const { sampleSlider, house, flat, apartments, square, rooms } = filterForm;
  return {
    sampleSlider: getSliderRange(sampleSlider.value),
    house: house.checked,
    flat: flat.checked,
    apartments: apartments.checked,
    area: +square.value,
    rooms: rooms.value
  };
};

const onFilterFormSubmit = (evt) => {
  evt.preventDefault();
  const filterValues = getFiltersData();
  document.querySelector('#sort-popular').checked = true;

  filterDataCopy = filterData.filter(card => (
    checkCardPrice(card.price, filterValues.sampleSlider) &&
    checkCardType(card.filters.type, filterValues.house, filterValues.flat, filterValues.apartments) &&
    checkCardRooms(card.filters.roomsCount, filterValues.rooms) &&
    card.filters.area >= filterValues.area
  )
  );
  if (filterDataCopy.length != 0) {
    debounce(renderCatalogList(filterDataCopy));
  } else {
    clearHTMLItem(catalogList);
    debounce(catalogList.insertAdjacentElement("beforeEnd", renderElement(notFound)));
  };
};

const initListener = () => {
  filterForm.addEventListener("submit", onFilterFormSubmit);
};

export const initFilters = (CardsData) => {
  filterData = CardsData;
  filterDataCopy = filterData.slice();
 
  initListener();
};

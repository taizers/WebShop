"use strict";

import './rSlider.min.js';

const MIN_PRICE = 250000;
const MAX_PRICE = 2000000;
const DEBOUNCE_INTERVAL = 500;

const getSliderValues = () => {
    const pricesValues = [];
    for (let i = MIN_PRICE; i < MAX_PRICE + 1; i += 10000) {
        pricesValues.push(i);
    }
    return pricesValues;
};

const mySlider = new rSlider({
    target: '#sampleSlider',
    values: getSliderValues(),
    range: true,
    tooltip: true,
    scale: true,
    labels: true,
    set: [MIN_PRICE, MAX_PRICE],
    step: 10000,
});

export const adapter = (cards) => {
    const cardsList = [];
    cards.forEach((card, index) => {
        cardsList.push({
            card_id: `card_${index}`,
            favorite: false,
            name: card.name,
            description: card.description,
            price: card.price,
            category: card.category,
            coordinates: card.coordinates,
            seller: {
                fullname: card.seller.fullname,
                rating: card.seller.rating,
            },
            publishDate: +card['publish-date'],
            address: {
                city: card.address.city,
                street: card.address.street,
                building: card.address.building,
            },
            photos: card.photos,
            filters: {
                type: card.filters.type,
                area: card.filters.area,
                roomsCount: card.filters['rooms-count'],
            },
        })
    });
    return cardsList;
};

let lastTimeout; 

export const debounce = (fn) => {
  if (lastTimeout) {
    clearTimeout(lastTimeout);
  }
  lastTimeout = setTimeout(fn,DEBOUNCE_INTERVAL);
};

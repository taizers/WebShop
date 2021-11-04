"use strict";

import '../lib/rSlider.min.js';

const MIN_PRICE = 1000000;
const MAX_PRICE = 40000000;
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

export function debounce(fn) {
    let isCooldown = false;
    return function() {
        if (isCooldown) return;

        fn.apply(this, arguments);

        isCooldown = true;

        setTimeout(() => isCooldown = false, DEBOUNCE_INTERVAL);
    };
};

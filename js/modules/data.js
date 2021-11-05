"use strict";

const DEBOUNCE_INTERVAL = 500;

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

export const debounce = (f) => {
    let timeout;
    return function () {
        const funcSteps = () => { f.apply(this, arguments) }
        clearTimeout(timeout);
        timeout = setTimeout(funcSteps, DEBOUNCE_INTERVAL)
    };
};

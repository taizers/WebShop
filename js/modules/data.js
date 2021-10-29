"use strict";

import './rSlider.min.js';

const MIN_COUNT_PHOTO = 1;
const MAX_COUNT_PHOTO = 4;
const MIN_PRICE = 250000;
const MAX_PRICE = 2000000;
const MIN_RATING = 0;
const MAX_RATING = 5;
const MIN_BUILDING_NUMBER = 1;
const MAX_BUILDING_NUMBER = 40;
const MIN_AREA_COUNT = 30;
const MAX_AREA_COUNT = 250;
const MIN_ROOM_COUNT = 1;
const MAX_ROOM_COUNT = 7;
export const MAX_VIEW_PRODUCT_COUNT = 7;
const WEEK_IN_MS = 518400000;
const CATEGORY = "Недвижимость";

const getSliderValues = () => {
    const pricesValues = [];
    for (let i = MIN_PRICE; i < MAX_PRICE + 1; i += 1000) {
        pricesValues.push(i);
    }
    return pricesValues;
}

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

function getRandom(min, max) {
let rand = min - 0.5 + Math.random() * (max - min + 1); // рандом переделать
return Math.round(rand);
}

function getRandomFloat(min, max) {
return Math.random() * (max - min) + min;
}

const names = [
"Двушка в центре Питера",
"Однушка в спальнике Питера",
"Трешка рядом с Кремлём",
"Студия для аскетов",
"Апартаменты для фрилансера"
];

const descriptions = [
"Студия с лаконичным дизайном возле Ангары.",
"Трёхкомнатная квартира для большой семьи рядом с Кремлём.",
"2 минуты до набережной и прекрасного вида на Волгу.",
"В квартире есть сауна, джакузи и домашний кинотеатр. Перепланировка согласована.",
"Уютная однушка в тихом спальном районе. Рядом лес и озёра."
];

const fullNames = [
"Бюро Семёна",
"Игнат-Агент",
"Виталий Петрович",
"Марья Андреевна",
];

const citys = [
"Иркутск",
"Москва",
"Красноярск ",
"Минск"
];

const streets = [
"ул. Шахтеров",
"ул. Полярная",
"ул. Лиственная",
"ул. Мира",
"ул. Советская"
];

const photoFileNames = [
"apt_1.png",
"apt_2.png",
"apt_3.png",
"apt_4.png",
"apt_5.png",
"apt_6.png",
"house_1.png",
"house_2.png",
"house_3.png",
"house_4.png"
];

const types = [
"house",
"apartments",
"flat",
];

const getNumbersDate = () =>{
const date = Date.now();
const randomDate = getRandom(0, WEEK_IN_MS);
return date - randomDate;
}

const getPhotos = () => {
const photos = [];
for (let index = 0; index < getRandom(MIN_COUNT_PHOTO, MAX_COUNT_PHOTO); index++) {
    let photoFileName ="";
    do {
    photoFileName = `img/${photoFileNames[getRandom(0, photoFileNames.length - 1)]}`;
    } while (photos.includes(photoFileName));
    photos.push(photoFileName);
}
return photos;
}
const getProductsData = () => {
    const productsData = [];
    for (let index = 0; index < MAX_VIEW_PRODUCT_COUNT; index++) {
        const productData = {
            "card_id" : `card_${index}`,
            "name": names[getRandom(0, names.length - 1)],
            "description": descriptions[getRandom(0, descriptions.length - 1)],
            "price": Math.round(getRandom(MIN_PRICE,MAX_PRICE) / 100) * 100,
            "category": CATEGORY,
            "seller": {
            "fullName": fullNames[getRandom(0, fullNames.length - 1)],
            "rating": Math.ceil(getRandomFloat(MIN_RATING, MAX_RATING) * 10) / 10
            },
            "publishDate": getNumbersDate(),
            "address": {
            "city": citys[getRandom(0, citys.length - 1)],
            "street": streets[getRandom(0, streets.length - 1)],
            "building": `${getRandom(MIN_BUILDING_NUMBER, MAX_BUILDING_NUMBER)}`
            },
            "photos": getPhotos(),
            "filters": {
            "type": types[getRandom(0, types.length - 1)],
            "area": getRandom(MIN_AREA_COUNT, MAX_AREA_COUNT),
            "roomsCount": getRandom(MIN_ROOM_COUNT, MAX_ROOM_COUNT)
            }
        }
    productsData.push(productData);
    }
    return productsData;
};

export const productsData = getProductsData();


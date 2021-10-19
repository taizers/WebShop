"use strict";
var mySlider = new rSlider({
  target: '#sampleSlider',
  values: [10000, 1000000],
  range: true,
  tooltip: true,
  scale: true,
  labels: false,
  step: 10000
});

function getRandom(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
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
  " Иркутск",
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
  "apartment",
  "flat",
];

/*const sellers = {
  "fullname": fullNames[getRandom(0, fullNames.length - 1)],
  "rating": Math.ceil(getRandomFloat(0,5) * 10) / 10
}

const adress = {
  "city": citys[getRandom(0, citys.length - 1)],
  "street": streets[getRandom(0, streets.length - 1)],
  "building": `д. ${getRandom(1, 40)}`
}

const filters = {
  "type": types[getRandom(0, types.length - 1)],
  "area": getRandom(30, 250),
  "roomsCount": getRandom(1, 7)
}*/

const photos = [];
const cards = [];

for (let index = 0; index < getRandom(1, 4); index++) {
    photos[index] = `img/${photoFileNames[getRandom(0, photoFileNames.length - 1)]}`;
  
}

for (let index = 0; index < 7; index++) {
  const card = {
    "name": names[getRandom(0, names.length - 1)],
    "description": descriptions[getRandom(0, descriptions.length - 1)],
    "price": Math.round(getRandom(250000,2000000) / 100) * 100,
    "category": "Недвижимость",
    "seller": {
      "fullname": fullNames[getRandom(0, fullNames.length - 1)],
      "rating": Math.ceil(getRandomFloat(0,5) * 10) / 10
    },
    "publishDate": `${new Date()}`,
    "adress": {
      "city": citys[getRandom(0, citys.length - 1)],
      "street": streets[getRandom(0, streets.length - 1)],
      "building": `д. ${getRandom(1, 40)}`
    },
    "photos": photos[getRandom(0, photos.length - 1)],
    "filters": {
      "type": types[getRandom(0, types.length - 1)],
      "area": getRandom(30, 250),
      "roomsCount": getRandom(1, 7)
    }
  }
  cards.push(card);
}

cards.forEach(element => {
  console.log(element);
});

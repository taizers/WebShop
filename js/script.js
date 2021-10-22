"use strict";

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
const MAX_VIEW_PRODUCT_COUNT = 7;
const MAX_DAYS_BEFORE = 518400000;
const YESTERDAY = 86400000;
const BEFORE_YESTERDAY = 172800000;
const CATEGORY = "Недвижимость";
const CURRENCY = "₽";

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
  "apartment",
  "flat",
];

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
]

const productsData = [];

const getproductsDate = () => {
  const date = Date.now();
  const lastDate = date - MAX_DAYS_BEFORE;
  const productDate = getRandom(lastDate, date);
  let productDateStr;
  if (productDate<=date && productDate>date-YESTERDAY) {
    productDateStr = "Сегодня";
  } else
  if (productDate<=date-YESTERDAY && productDate>date-BEFORE_YESTERDAY) {
    productDateStr = "Вчера";
  }else
  {
    productDateStr = `${new Date(productDate).getDay() + 1} ${months[new Date(productDate).getMonth()]} ${new Date(productDate).getFullYear()} года`;
  }
  return productDateStr;
}

const getPhotos = () => {
  const photos = [];
  for (let index = 0; index < getRandom(MIN_COUNT_PHOTO, MAX_COUNT_PHOTO); index++) {
    do {
      let photoFileName = `img/${photoFileNames[getRandom(0, photoFileNames.length - 1)]}`;
    } while (photos.includes(photoFileName));
    photos.push(photoFileName);
  }
  return photos;
}

for (let index = 0; index < MAX_VIEW_PRODUCT_COUNT; index++) {
  const productData = {
    "name": names[getRandom(0, names.length - 1)],
    "description": descriptions[getRandom(0, descriptions.length - 1)],
    "price": Math.round(getRandom(MIN_PRICE,MAX_PRICE) / 100) * 100,
    "category": CATEGORY,
    "seller": {
      "fullname": fullNames[getRandom(0, fullNames.length - 1)],
      "rating": Math.ceil(getRandomFloat(MIN_RATING, MAX_RATING) * 10) / 10
    },
    "publishDate": getproductsDate(),
    "adress": {
      "city": citys[getRandom(0, citys.length - 1)],
      "street": streets[getRandom(0, streets.length - 1)],
      "building": `д. ${getRandom(MIN_BUILDING_NUMBER, MAX_BUILDING_NUMBER)}`
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

productsData.forEach(element => {
  console.log(element);
});

const addElem = (productData) => {

  const li = document.createElement('li');
  li.classList.add('product');
  li.classList.add('results__item');
  li.innerHTML=`
      <button class="product__favourite fav-add" type="button" aria-label="Добавить в избранное">
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
        <div class="product__price">${productData.price} ${CURRENCY}</div>
        <div class="product__address">${productData.adress.city}, ${productData.adress.street}</div>
        <div class="product__date">${productData.publishDate}</div>
      </div>
    `;
  return li;
};

let productsSortCopyArr = productsData.slice();
const catalogList = document.querySelector('.results__list');

const renderCatalogList = () => {
  const fragment = document.createDocumentFragment();
  productsSortCopyArr.slice(0, MAX_VIEW_PRODUCT_COUNT).forEach((it) => {
    fragment.appendChild(addElem(it));
  });

  catalogList.innerHTML = '';
  catalogList.appendChild(fragment);
};

renderCatalogList();

const modal = document.querySelector(".popup");
const productImages = document.querySelectorAll(".product__image");
const productTitles = document.querySelectorAll(".product__title");
const productCloseBtn = document.querySelector(".popup__close");

const modalTitle = document.querySelector(".popup__title");
const modalDate = document.querySelector(".popup__date");
const modalPrice = document.querySelector(".popup__price");
const modalGalery = document.querySelector(".gallery__list");

const renderModalItemData = (index) =>{

}

const openModal = () => {
  modal.classList.add("popup__active");
};

const closeModal = () => {
  modal.classList.remove("popup__active");
};

const onCloseBtnClick = () => {
  closeModal();
  removeModalListeners();
};

const onShowClick = (index) => {
  renderModalItemData(index);
  initModalListeners();
  openModal();
};

const onModalMoveOutClose = () => {
  document.removeEventListener('keydown',onModalKeyDownClose);
  document.removeEventListener('mouseout',onModalMoveOutClose);
}

const onModalKeyDownClose = (evt) => {
  if (evt.keyCode === 13) {
    evt.preventDefault();
    onCloseBtnClick();
  };
}

const onCloseBtnMove = (evt) => {
  document.addEventListener('keydown',onModalKeyDownClose);
  document.addEventListener('mouseout',onModalMoveOutClose);
}

const onModalKeyDown = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    onCloseBtnClick();
  };
};

const onModalOutLineClick = (evt) =>{
  console.log(evt.target);
  if (evt.target === modal) {
      onCloseBtnClick();
  }
};

const removeModalListeners = () => {
    productCloseBtn.removeEventListener("click",onCloseBtnClick);
    productCloseBtn.removeEventListener("mouseover",onCloseBtnMove);
    document.removeEventListener('keydown',onModalKeyDown); 
    window.removeEventListener("click",onModalOutLineClick);
};
const initModalListeners = () => {  
    productCloseBtn.addEventListener("click",onCloseBtnClick);
    productCloseBtn.addEventListener("mouseover",onCloseBtnMove);
    document.addEventListener('keydown',onModalKeyDown); 
    window.addEventListener("click",onModalOutLineClick);
};
 

for (let index = 0; index < productTitles.length; index++) {
  productTitles[index].addEventListener('click', (evt) => {
    onShowClick(index);
  })
  productImages[index].addEventListener('click', (evt) => {
    onShowClick(index);
  })
}
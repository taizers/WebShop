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
const BEFORE_YESTERDAY = 172800000;//переименовать
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
];

const getTeg = (textTeg) =>{
  const d = document.createElement('div');
  d.insertAdjacentHTML("beforeEnd", textTeg);
  return d.firstElementChild;
}

const productsData = [];

const getNumbersDate = () =>{
  const date = Date.now();
  const randomDate = getRandom(0, MAX_DAYS_BEFORE);
  return date - randomDate;
}

const getProductsDate = (productDate) => {
  const date = Date.now();
  if (productDate <= date && productDate > date - YESTERDAY) {
    return "Сегодня";
  } else
  if (productDate <= date - YESTERDAY && productDate > date - BEFORE_YESTERDAY) {
    return "Вчера";
  }else
  {
    return `${new Date(productDate).getDay() + 1} ${months[new Date(productDate).getMonth()]} ${new Date(productDate).getFullYear()} года`;
  }
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

const numberWithSpaces = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

for (let index = 0; index < MAX_VIEW_PRODUCT_COUNT; index++) {
  const productData = {
    "name": names[getRandom(0, names.length - 1)],
    "description": descriptions[getRandom(0, descriptions.length - 1)],
    "price": Math.round(getRandom(MIN_PRICE,MAX_PRICE) / 100) * 100,
    "category": CATEGORY,
    "seller": {
      "fullName": fullNames[getRandom(0, fullNames.length - 1)],
      "rating": Math.ceil(getRandomFloat(MIN_RATING, MAX_RATING) * 10) / 10
    },
    "publishDate": getNumbersDate(),
    "adress": {
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

productsData.forEach(element => {
  console.log(element);
});

const productCard = (productData) =>{ 
  const textTeg = `
  <li class="results__item product">
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
      <div class="product__price">${numberWithSpaces(productData.price)} ${CURRENCY}</div>
      <div class="product__address">${productData.adress.city}, ${productData.adress.street}</div>
      <div class="product__date">${getProductsDate(productData.publishDate)}</div>
    </div>
  </li>
`;
  return textTeg;
};

const productEventCard = (productData) =>{ 
  const textTeg = `
  <div class="popup__inner">
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
          <button class="gallery__favourite fav-add">
            <svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M3 7C3 13 10 16.5 11 17C12 16.5 19 13 19 7C19 4.79086 17.2091 3 15 3C12 3 11 5 11 5C11 5 10 3 7 3C4.79086 3 3 4.79086 3 7Z" stroke="white" stroke-width="2" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="gallery__main-pic">
            <img src="${productData.photos[0]}" width="520" height="340" alt="${productData.name}">
          </div>
          <ul class="gallery__list">
          </ul>
        </div>
        <ul class="popup__chars chars">
          <li class="chars__item">
            <div class="chars__name">Площадь</div>
            <div class="chars__value">${productData.filters.area}</div>
          </li>
          <li class="chars__item">
            <div class="chars__name">Количество комнат</div>
            <div class="chars__value">${productData.filters.roomsCount}</div>
          </li>
          <li class="chars__item">
            <div class="chars__name">Тип недвижимости</div>
            <div class="chars__value">${productData.filters.type}</div>
          </li>
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
          <img src="img/map.jpg" width="268" height="180" alt="${productData.adress.city}, ${productData.adress.street}, дом ${productData.adress.building}">
        </div>
        <div class="popup__address">${productData.adress.city}, ${productData.adress.street}, дом ${productData.adress.building}</div>
      </div>
    </div>
  </div>
`;
  return textTeg;
};

const productGaleryImage = (photoLink, alt) =>{ 
  const textTeg = `
  <li class="gallery__item">
    <img src="${photoLink}" width="124" height="80" alt="${alt}">
  </li>
`;
  return textTeg;
};

const productsCopyArr = productsData.slice();
const catalogList = document.querySelector('.results__list');
const sortPriceBtn = document.querySelector(".sorting__price");
const sortPopularBtn = document.querySelector(".sorting__popular");
const sortDateBtn = document.querySelector(".sorting__date");

//////////////////////              SORT                    //////////////////////////////////

const sortProductPrice = (firstElement, SecondElement) => {
  const firstElementSort = firstElement.price;
  const SecondElementSort = SecondElement.price;
  
  return firstElementSort-SecondElementSort;
};
const sortProductDate = (firstElement, SecondElement) => {
  const firstElementSort = firstElement.publishDate;
  const SecondElementSort = SecondElement.publishDate;
  
  return firstElementSort-SecondElementSort;
};

const onSortPriceBtnClick = () => {
  productsCopyArr = productsData.slice();
  productsCopyArr.sort(sortProductPrice);
  renderCatalogList();
};

const onSortDateBtnClick = () => {
  productsCopyArr = productsData.slice();
  productsCopyArr.sort(sortProductDate).reverse();
  renderCatalogList();
};

const onSortPopularBtnClick = () => {
  productsCopyArr = productsData.slice();
  renderCatalogList();
};

//////////////////////              SORT END                    //////////////////////////////////

const modal = document.querySelector(".popup");

const renderPhotos = (producElementData) => {
  const modalGalery = modal.querySelector(".gallery__list");
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < producElementData.photos.length; index++) {
    fragment.appendChild(getTeg(productGaleryImage(producElementData.photos[index],producElementData.name)));
  }
  fragment.firstChild.classList.add("gallery__item--active");
  modalGalery.innerHTML = '';
  modalGalery.appendChild(fragment);
};


const addSwapOnGalery = (evt) =>{
  const galeryMainImage = modal.querySelector(".gallery__main-pic");

  findGaleryImages().forEach(image => {
    image.classList.remove("gallery__item--active");
  });

  evt.currentTarget.classList.add("gallery__item--active");
  galeryMainImage.firstElementChild.src = evt.target.src;
};

const renderModalItemData = (index) =>{
  const fragment = document.createDocumentFragment();
  fragment.appendChild(getTeg(productEventCard(productsCopyArr[index])));

  modal.innerHTML = '';
  modal.appendChild(fragment);
  renderPhotos(productsCopyArr[index]);
};

const findCloseButton = () => {
  const modalCloseBtn = modal.querySelector(".popup__close");
  return modalCloseBtn;
};

const findGaleryImages = () => {
  const galeryImages = modal.querySelectorAll(".gallery__item");
  return galeryImages;
};

const openModal = () => {
  modal.classList.add("popup--active");
};

const closeModal = () => {
  modal.classList.remove("popup--active");
};

const onCloseBtnClick = () => {
  removeModalListeners(findCloseButton());
  closeModal();
};

const onShowClick = (index) => {
  renderModalItemData(index);
  initModalListeners(findCloseButton());
  openModal();
};

const onModalMoveOutClose = () => {
  document.removeEventListener('keydown',onModalKeyDownClose);
  document.removeEventListener('mouseout',onModalMoveOutClose);
}

const onModalKeyDownClose = (evt) => {
  if (evt.key === "Enter") {
    evt.preventDefault();
    onCloseBtnClick();
  };
}

const onCloseBtnMove = (evt) => {
  document.addEventListener('keydown',onModalKeyDownClose);
  document.addEventListener('mouseout',onModalMoveOutClose);
}

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

const addListenersToCards = () =>{
  const productImages = document.querySelectorAll(".product__image");
  const productTitles = document.querySelectorAll(".product__title");
  /*
  for (let index = 0; index < productTitles.length; index++) {
    productTitles[index].addEventListener('click', (evt) => {
      onShowClick(index);
    })
    productImages[index].addEventListener('click', (evt) => {
      onShowClick(index);
    })
  }*/
  console.log(typeof(productTitles));
  
  productTitles.forEach(element => {
    element.addEventListener('click', onShowClick());
  });
  productImages.forEach(element => {
    element.addEventListener('click', onShowClick());
  });
  
};

const renderCatalogList = () => {
  const fragment = document.createDocumentFragment();

  productsCopyArr.slice(0, MAX_VIEW_PRODUCT_COUNT).forEach((it) => {
    fragment.appendChild(getTeg(productCard(it)));
  });
  //удалить обработчики и добавить именование обработчикам 
  catalogList.innerHTML = '';
  catalogList.appendChild(fragment);
  addListenersToCards();
};

renderCatalogList();

sortPriceBtn.addEventListener('click',onSortPriceBtnClick); 
sortDateBtn.addEventListener('click',onSortDateBtnClick); 
sortPopularBtn.addEventListener('click',onSortPopularBtnClick); 

const removeModalListeners = (modalCloseBtn) => {
    findGaleryImages().forEach(item => {
      item.removeEventListener('click', addSwapOnGalery)
    });
    modalCloseBtn.removeEventListener("click",onCloseBtnClick);
    modalCloseBtn.removeEventListener("mouseover",onCloseBtnMove);
    document.removeEventListener('keydown',onModalKeyDown); 
    window.removeEventListener("click",onModalOutLineClick);
};
const initModalListeners = (modalCloseBtn) => {  
    findGaleryImages().forEach(item => {
      item.addEventListener('click', addSwapOnGalery)
    });
    modalCloseBtn.addEventListener("click",onCloseBtnClick);
    modalCloseBtn.addEventListener("mouseover",onCloseBtnMove);
    document.addEventListener('keydown',onModalKeyDown); 
    window.addEventListener("click",onModalOutLineClick);
};
 







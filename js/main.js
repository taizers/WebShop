import { getServerData } from './modules/backend.js';
import { adapter } from './modules/data.js';
import { renderCatalogList } from './modules/render-cards.js';
import { initFilters } from './modules/filters.js';
import { initFavorite } from './modules/favorites.js';
import { onSortBtnsClick } from './modules/sort.js';
import { clearHTMLItem, renderElement } from './modules/render.js';

const MIN_VIEW_PRODUCTS_COUNT = 0;
const MAX_VIEW_PRODUCTS_COUNT = 7;

let cardsData = [];

const getErrorSample = (errorMessage) => {
    const error = 
        `<div class="popup__inner">
            <h2 class="popup__title">Ошибка загрузки данных</h2>
            <div class="popup__description">
                <p>Код ошибки: <span>${errorMessage}</span>, проверьте адрес и попробуйте перезагрузить страницу</p>
            </div>
        </div>`;
    return error;
};

const initListenersAndRender = () => {
    const itemsCount = Math.min(cardsData.length, MAX_VIEW_PRODUCTS_COUNT);

    renderCatalogList(cardsData.slice(MIN_VIEW_PRODUCTS_COUNT, itemsCount));
    initFilters(cardsData.slice(MIN_VIEW_PRODUCTS_COUNT, itemsCount));
    initFavorite();

    onSortBtnsClick();
};

const onError = (errorMessage) => {
    const modal = document.querySelector(".popup");
    clearHTMLItem(modal);
    modal.insertAdjacentElement("beforeEnd", renderElement(getErrorSample(errorMessage)));
    modal.classList.add("popup--active");
};

function onLoad(data) {
    localStorage.clear();
    cardsData = adapter(data.products);

    initListenersAndRender();
}

getServerData(onLoad,onError);

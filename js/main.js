//import './modules/render-cards.js'; 
import { getServerData } from './modules/backend.js';
import { adapter, debounce } from './modules/data.js';
import { renderCatalogList } from './modules/render-cards.js';
import { initFilters } from './modules/filters.js';
import { initFavorite } from './modules/favorites.js';
import { onSortBtnsClick } from './modules/sort.js';


const MIN_VIEW_PRODUCT_COUNT = 0;
const MAX_VIEW_PRODUCT_COUNT = 7;


let cardsData = [];

const initListeners = (cardsDataCopy) => {
    renderCatalogList(cardsDataCopy);
    initFilters(cardsDataCopy);
    initFavorite(cardsDataCopy);

    onSortBtnsClick();
};

const onError = (errorMessage) => {
    console.log(errorMessage);
};

const onLoad = (data) => {
    localStorage.clear();
    cardsData = adapter(data.products);

    const itemsCount = Math.min(cardsData.length, MAX_VIEW_PRODUCT_COUNT);
    initListeners(cardsData.slice(MIN_VIEW_PRODUCT_COUNT, itemsCount)); 
};

getServerData(onLoad,onError);

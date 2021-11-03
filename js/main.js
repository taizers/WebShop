/* import './modules/render-cards.js';
import './modules/favorites.js';
import './modules/filters.js';  */
import { getServerData } from './modules/backend.js';
import { adapter, debounce } from './modules/data.js';
import { renderCatalogList } from './modules/render-cards.js';
import { getCardContentData, onFavoritesRemove, onFavoritesAdd } from './modules/open-modal.js';
import { selectFiltersOnProducts } from './modules/filters.js';
import { onSortClick } from './modules/sort.js';
import { setFavorite } from './modules/favorites.js';

const MAX_VIEW_PRODUCT_COUNT = 7;

let cardsData = [];

const onError = (errorMessage) => {
    console.log(errorMessage);
};


const onLoad = (data) => {
    localStorage.clear();
    cardsData = adapter(data.products);

    const setFavoritStatus = (id, elemetTarget) => {
        const cardDataItem = getCardContentData(cardsData, id);

        if (cardDataItem.favorite) {
            onFavoritesRemove(cardDataItem, elemetTarget);
        }else{
            onFavoritesAdd(cardDataItem, elemetTarget);
        }
        cardDataItem.favorite = !cardDataItem.favorite;
    };

    renderCatalogList(cardsData.slice(0, MAX_VIEW_PRODUCT_COUNT), setFavoritStatus);

    const onFavoritesBtnClick = () => {
        console.log("сработал fav");
        setFavorite(cardsData.slice(0, MAX_VIEW_PRODUCT_COUNT), setFavoritStatus);
    };

    const onFilterFormSubmit = (evt) => {
        evt.preventDefault();
        selectFiltersOnProducts(cardsData, setFavoritStatus);
    };

    onSortClick(cardsData, setFavoritStatus);

    document.querySelector(".sorting__favourites").addEventListener("click", onFavoritesBtnClick);      
    document.querySelector(".filter").querySelector("form").addEventListener("submit", onFilterFormSubmit);
    
};

getServerData(onLoad,onError);

/* 
import './modules/data.js';
import './modules/render-cards.js';
import './modules/open-module.js';
import './modules/sort.js';
import './modules/favorites.js';
import './modules/filters.js'; 
import './modules/render.js'; */
"use strict";

const CURRENCY = "₽";
const ONE_DAY_IN_MS = 86400000;
const TWO_DAYS_IN_MS = 172800000;

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

export const getProductsDate = (productDate) => {
    if (productDate != null) {
        const date = Date.now();
    if (productDate <= date && productDate > date - ONE_DAY_IN_MS) {
        return "Сегодня";
    } else
    if (productDate <= date - ONE_DAY_IN_MS && productDate > date - TWO_DAYS_IN_MS) {
        return "Вчера";
    }else
    {
        return `${new Date(productDate).getDay() + 1} ${months[new Date(productDate).getMonth()]} ${new Date(productDate).getFullYear()} года`;
    }
    }else
    {
        return "";
    }
};

export const numberWithSpaces = (price) => {
    if (price != null) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " " + CURRENCY;
    }else
        return "";
};
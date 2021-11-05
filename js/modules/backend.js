"use strict";

const URL = "https://morfey216.github.io/online-store-bd/bd.json";

export const getServerData = (onLoad, onError) => {
  fetch(URL)
    .then(respons => respons.json())
    .then(data => { onLoad(data) })
    .catch(err => onError(err))
};

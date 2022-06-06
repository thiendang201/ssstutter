import { BASE_URL } from "../config";
import { getData } from "./services";

function search(searchStr = "", limit = 4) {
  const url =
    BASE_URL + `products/search?searchStr=${searchStr.trim()}&limit=${limit}`;
  return getData(url);
}

function filterProducts(start = 0, limit = 9, cateId = 0, sort = "desc") {
  const url =
    BASE_URL +
    `products/filter?cateId=${cateId}&start=${start}&limit=${limit}&sort=${sort}`;
  return getData(url);
}
function getSizes() {
  const url = BASE_URL + `colors`;
  return getData(url);
}
function getColors() {
  const url = BASE_URL + `sizes`;
  return getData(url);
}

function getNewProducts(limit = 4, cateId = 0) {
  const url =
    BASE_URL + `products/new_products?limit=${limit}&cateId=${cateId}`;
  return getData(url);
}

function getWeeklyBestProducts(limit = 4, cateId = 0) {
  const url = BASE_URL + `products/weekly_best?limit=${limit}&cateId=${cateId}`;
  return getData(url);
}

export {
  search,
  getNewProducts,
  getWeeklyBestProducts,
  filterProducts,
  getSizes,
  getColors,
};

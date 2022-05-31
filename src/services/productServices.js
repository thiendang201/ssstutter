import { BASE_URL } from "../config";
import { getData } from "./services";

function search(searchStr = "", limit = 4) {
  const url =
    BASE_URL + `products/search?searchStr=${searchStr}&limit=${limit}`;
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

export { search, getNewProducts, getWeeklyBestProducts };

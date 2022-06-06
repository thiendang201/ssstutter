import { BASE_URL } from "../config";
import { getData } from "./services";

function getMenu() {
  const url = BASE_URL + `menu`;
  return getData(url);
}

function getCategory() {
  const url = BASE_URL + `category`;
  return getData(url);
}

function getCategoryInfo(cateId) {
  const url = BASE_URL + `category/detail?cateId=${cateId}`;
  return getData(url);
}

function getChildrenCategories(parentsId) {
  const url = BASE_URL + `category/children?parentsId=${parentsId}`;
  return getData(url);
}

export { getMenu, getCategory, getChildrenCategories, getCategoryInfo };

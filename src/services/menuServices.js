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

export { getMenu, getCategory };

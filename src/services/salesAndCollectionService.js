import { BASE_URL } from "../config";
import { getData } from "./services";

function getBanner() {
  const url = BASE_URL + `banner`;
  return getData(url);
}

function getCollection(collectionId, start) {
  const url =
    BASE_URL + `collection?collectionId=${collectionId}&start=${start}`;
  return getData(url);
}
function getProductsCollection(collectionId, start) {
  const url =
    BASE_URL + `productsCollection?collectionId=${collectionId}&start=${start}`;
  return getData(url);
}

export { getBanner, getCollection, getProductsCollection };

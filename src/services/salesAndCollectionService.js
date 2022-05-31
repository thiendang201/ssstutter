import { BASE_URL } from "../config";
import { getData } from "./services";

function getBanner() {
  const url = BASE_URL + `banner`;
  return getData(url);
}

export { getBanner };

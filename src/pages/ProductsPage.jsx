import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import {
  getCategoryInfo,
  getChildrenCategories,
} from "../services/menuServices";
import {
  filterProducts,
  getColors,
  getSizes,
} from "../services/productServices";
import { capitalize } from "../utils/capitalizeString";
import { CSSTransition } from "react-transition-group";
import Product from "../components/product/Product";

const ProductsPage = () => {
  const { cateId } = useParams();
  const [category, setCategory] = useState({ id: cateId, name: "", text: "" });
  const [childrenCategories, setChildrenCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState({
    start: 0,
    sort: "desc",
  });
  const [openCateList, setOpenCateList] = useState(false);

  const { start, sort } = filter;

  useEffect(() => {
    async function fetchData() {
      const children = await getChildrenCategories(cateId);
      const sizes = await getSizes();
      const colors = await getColors();

      setChildrenCategories(children);
      setSizes(sizes);
      setColors(colors);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    async function fetchData() {
      const { total, ...cateInfo } = await getCategoryInfo(category.id);

      setCategory(cateInfo);
      setTotal(total);
    }

    fetchData();
  }, [category.id]);

  useEffect(() => {
    async function fetchData() {
      const products = await filterProducts(start, 9, category.id, sort);
      setProductList(products);
    }

    fetchData();
  }, [category.id, sort, start]);

  const changeCategory = (id) => (e) => {
    e.preventDefault();
    setCategory({ ...category, id: id });
  };

  const handleCategory = () => {
    setOpenCateList(!openCateList);
  };

  return (
    <div>
      <div className="flex justify-between px-[2rem] py-[0.5rem] fixed top-[5.8rem] left-0 right-0 z-10 bg-white">
        <div className="relative">
          <button
            onClick={handleCategory}
            className="flex items-center gap-[0.6rem] text-[1.6rem] font-semibold"
          >
            {capitalize(category?.text || category?.name || "")}
            <RiArrowDropDownLine size={24} />
          </button>
          <CSSTransition
            in={openCateList}
            timeout={300}
            classNames="dialog-up"
            unmountOnExit
          >
            <ul className="shadow-lg bg-white rounded-[0.4rem] absolute top-[100%] p-[2rem] pt-[1rem] left-0 min-w-max max-w-[80vh] max-h-[70vh] z-10">
              {childrenCategories.map(({ id, name }) => (
                <li
                  key={id}
                  className="border-b last:border-b-0 border-[#ececec]"
                >
                  <Link
                    to="#"
                    onClick={changeCategory(id)}
                    className="font-semibold text-[1.4rem] p-[1rem] block"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </CSSTransition>
        </div>
        <div>
          <button className="flex items-center gap-[0.6rem] text-[1.6rem] font-semibold">
            <VscSettings size={24} /> Filter
          </button>
        </div>
      </div>
      <ul className="grid grid-cols-2 gap-[1rem]">
        {productList.map((product) => (
          <li key={product.id} className="nt5">
            <Product {...product} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;

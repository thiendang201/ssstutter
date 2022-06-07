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
import Loading from "../components/product/Loading";
import InfiniteScroll from "react-infinite-scroll-component";

const ProductsPage = () => {
  const { cateId, parentId } = useParams();
  const [category, setCategory] = useState({ id: cateId, name: "" });
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
      const cateInfo = await getCategoryInfo(cateId);
      const children = await getChildrenCategories(parentId || cateId);
      const sizes = await getSizes();
      const colors = await getColors();

      setCategory(cateInfo);
      setChildrenCategories(children);
      setSizes(sizes);
      setColors(colors);
    }

    fetchData();
  }, [cateId, parentId]);

  useEffect(() => {
    async function fetchData() {
      const { total, products } = await filterProducts(
        0,
        6,
        category.id,
        "desc"
      );
      setProductList(products);
      setTotal(total);
    }

    fetchData();
  }, [category.id]);

  useEffect(() => {
    async function fetchData() {
      const { total, products } = await filterProducts(
        start,
        6,
        category.id,
        sort
      );
      setProductList((prev) => {
        const existsList = prev.map(({ id }) => id);
        const newProducts = products.filter(
          ({ id }) => !existsList.includes(id)
        );
        const list = [...prev, ...newProducts];
        return list;
      });
      setTotal(total);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, start]);

  const fetchMoreData = () => {
    const hasMore = productList.length < total;
    hasMore && setFilter({ ...filter, start: productList.length });
  };

  const changeCategory = (category) => (e) => {
    e.preventDefault();
    setCategory(category);
    handleCategory();
    setFilter({ ...filter, start: 0 });
    window.scrollTo(0, 0);
  };

  const handleCategory = () => {
    setOpenCateList(!openCateList);
  };

  const loading = (
    <ul className="grid grid-cols-2 gap-[1rem] py-[4.4rem]">
      <li className="nt5">
        <Loading />
      </li>
      <li className="nt5">
        <Loading />
      </li>
      <li className="nt5">
        <Loading />
      </li>
      <li className="nt5">
        <Loading />
      </li>
      <li className="nt5">
        <Loading />
      </li>
    </ul>
  );

  console.log(total);
  console.log(filter);
  console.log(productList);

  return (
    <div>
      <div className="flex justify-between px-[2rem] py-[1rem] fixed top-[5.8rem] left-0 right-0 z-10 bg-white">
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
              {childrenCategories.map((category) => (
                <li
                  key={category.id}
                  className="border-b last:border-b-0 border-[#ececec]"
                >
                  <Link
                    to="#"
                    onClick={changeCategory(category)}
                    className="font-semibold text-[1.4rem] p-[1rem] block"
                  >
                    {category.name}
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
      {!productList.length && total > 0 && loading}
      {total === 0 && (
        <h3 className="pt-[10rem] pb-[4.4rem] text-center text-[1.6rem] font-semibold">
          Không có sản phẩm nào!
        </h3>
      )}
      {productList.length && (
        <InfiniteScroll
          dataLength={productList.length}
          next={fetchMoreData}
          hasMore={productList.length < total}
          loader={loading}
          scrollThreshold={0.7}
        >
          {
            <ul className="grid grid-cols-2 gap-[1rem] py-[4.4rem]">
              {productList.map((product) => (
                <li key={product.id} className="nt5">
                  <Product {...product} />
                </li>
              ))}
            </ul>
          }
        </InfiniteScroll>
      )}
    </div>
  );
};

export default ProductsPage;

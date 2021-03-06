import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import "rc-slider/assets/index.css";
import { CSSTransition } from "react-transition-group";

import {
  getCategoryInfo,
  getChildrenCategories,
} from "../services/menuServices";
import {
  filterProducts,
  getColors,
  getSizes,
  getMaxPrice,
} from "../services/productServices";
import { capitalize } from "../utils/capitalizeString";
import Product from "../components/product/Product";
import Loading from "../components/product/Loading";
import Button from "../shared/Button";
import Filter from "../components/filter/Filter";

const ProductsPage = () => {
  const { cateId, parentId } = useParams();
  const [category, setCategory] = useState({ id: cateId, name: "", text: "" });
  const [childrenCategories, setChildrenCategories] = useState([]);
  const [productList, setProductList] = useState([]);
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [total, setTotal] = useState(-1);
  const [maxPrice, setMaxPrice] = useState(0);
  const [openCateList, setOpenCateList] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [filter, setFilter] = useState({
    start: 0,
    colors: [],
    sizes: [],
    sort: "desc",
    price: [0, -1],
    limit: window.innerWidth < 768 ? 5 : 9,
    touched: {
      color: false,
      size: false,
      price: false,
      sort: false,
    },
  });

  useEffect(() => {
    async function fetchData() {
      setMaxPrice(await getMaxPrice());
      setCategory(await getCategoryInfo(cateId));
      setChildrenCategories(await getChildrenCategories(parentId || cateId));
      setSizes(await getSizes());
      setColors(await getColors());
    }

    fetchData();
  }, [cateId, parentId]);

  useEffect(() => {
    async function fetchData() {
      const { total, products } = await filterProducts({
        start: 0,
        colors: [],
        sizes: [],
        sort: "desc",
        price: [0, -1],
        cateId: category.id,
        limit: window.innerWidth < 768 ? 5 : 9,
      });
      setProductList(products);
      setTotal(total);
    }

    fetchData();
  }, [category.id]);

  useEffect(() => {
    async function fetchData() {
      const { total, products } = await filterProducts({
        ...filter,
        cateId: category.id,
      });
      if (filter.start === 0) {
        setProductList(products);
      } else {
        setProductList((prev) => {
          const existsList = prev.map(({ id }) => id);
          const newProducts = products.filter(
            ({ id }) => !existsList.includes(id)
          );
          const list = [...prev, ...newProducts];
          return list;
        });
      }
      setTotal(total);
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchMoreData = () => {
    const hasMore = productList.length < total;
    hasMore && setFilter({ ...filter, start: productList.length });
  };

  const changeCategory = (category) => (e) => {
    e.preventDefault();
    handleCategory();
    setCategory(category);
    unFilter();
    window.scrollTo(0, 0);
  };

  const handleCategory = () => {
    setOpenCateList(!openCateList);
  };
  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const unFilter = () => {
    setFilter({
      start: 0,
      colors: [],
      sizes: [],
      sort: "desc",
      price: [0, -1],
      limit: window.innerWidth < 768 ? 5 : 9,
      touched: {
        color: false,
        size: false,
        price: false,
        sort: false,
      },
    });
    setOpenFilter(false);
  };

  const onFilter = (name, type) => (data) => {
    let newData = null;
    if (type !== "range") {
      const {
        target: { value },
      } = data;

      if (type === "checkbox") {
        newData = filter[name].includes(value * 1)
          ? filter[name].filter((item) => item !== value * 1)
          : [...new Set([...filter[name], value * 1])];
      }
      if (type === "radio") {
        newData = value;
      }
    } else {
      const [min, max] = data;
      newData = [min * 1000, max * 1000];
    }

    setFilter({
      ...filter,
      [name]: newData,
      start: 0,
      touched: { ...filter.touched, [name]: true },
    });
    // if (type === "checkbox")
    // type === "checkbox" &&
    //   setFilter({
    //     ...filter,
    //     [name]: filter[name].includes(value * 1)
    //       ? filter[name].filter((item) => item !== value * 1)
    //       : [...new Set([...filter[name], value * 1])],
    //     // [...filter[name], value * 1],
    //   });
    // type === "radio" && setFilter({ ...filter, [name]: value });
  };

  console.log(filter);

  const onFilterClick = ({ target: { parentNode } }) => {
    parentNode.classList.toggle("max-h-[60vh]");
    parentNode.classList.toggle("max-h-[5.8rem]");
    if (parentNode.classList.contains("overflow-visible"))
      parentNode.classList.remove("overflow-visible");
    else parentNode.classList.add("overflow-visible");
  };

  const loading = (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-[1rem] py-[4.4rem]">
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

  const FilterTouched = Object.values(filter.touched).some(
    (touched) => touched
  );

  return (
    <div className="lg:px-[6.4rem]">
      <div className="hidden lg:block">
        <div>
          <h1 className="uppercase font-semibold text-[2.8rem] pt-[6rem]">
            {category.text || category.name}
          </h1>
          <p className="mr-[46%] font-semibold text-[1.4rem] opacity-50 mt-[1rem]">
            T???t c??? nh???ng s???n ph???m M???i nh???t n???m trong BST ???????c m??? b??n H??ng Tu???n
            s??? ???????c c???p nh???t li??n t???c t???i ????y. Ch???c ch???n b???n s??? t??m th???y nh???ng
            s???n ph???m ?????p Nh???t - V???a V???n Nh???t - Ph?? H???p nh???t v???i phong c??ch c???a
            m??nh.
          </p>
        </div>
        <ul className="pt-[6rem] grid grid-cols-5 gap-[1rem]">
          {childrenCategories.map((category) => (
            <li key={category.id}>
              <Link
                to="#"
                onClick={changeCategory(category)}
                className="font-semibold text-[1.4rem] py-[1rem] hover:opacity-75 transition-all duration-300"
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="lg:hidden flex justify-between px-[2rem] py-[1rem] fixed top-[5.8rem] left-0 right-0 z-10 bg-white ">
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
          <button
            onClick={handleFilter}
            className="flex w-[100%] items-center gap-[0.6rem] text-[1.6rem] font-semibold"
          >
            <VscSettings size={24} /> Filter
          </button>
          <CSSTransition
            in={openFilter}
            timeout={300}
            classNames="slide-up"
            unmountOnExit
          >
            <div className="fixed inset-0 md:right-[50%] z-[2] bg-white mt-[5.8rem] flex flex-col justify-between">
              <Filter
                filter={filter}
                colors={colors}
                sizes={sizes}
                onFilter={onFilter}
                onFilterClick={onFilterClick}
                maxPrice={maxPrice}
              />
              <div className="p-[2rem] flex justify-between gap-[1.4rem]">
                <Button
                  onclick={FilterTouched ? unFilter : handleFilter}
                  text={FilterTouched ? "B??? ch???n" : "Quay l???i"}
                  type="outline"
                  className="flex-1"
                />
                <Button
                  onclick={handleFilter}
                  text={FilterTouched ? `Xem ${total} k???t qu???` : "??p d???ng"}
                  className="flex-1"
                />
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
      <div className="lg:grid grid-cols-4 ">
        <div className="hidden lg:block col-[1/2] pt-[2.4rem] pr-[1rem]">
          <Filter
            filter={filter}
            colors={colors}
            sizes={sizes}
            onFilter={onFilter}
            onFilterClick={onFilterClick}
            maxPrice={maxPrice}
          />
        </div>
        <div className="col-[2/-1]">
          {total < 0 && loading}
          {total === 0 && (
            <h3 className="pt-[10rem] pb-[4.4rem] text-center text-[1.6rem] font-semibold">
              Kh??ng c?? s???n ph???m n??o!
            </h3>
          )}
          {total > 0 && (
            <InfiniteScroll
              dataLength={productList.length}
              next={fetchMoreData}
              hasMore={productList.length < total}
              loader={loading}
              scrollThreshold={0.7}
            >
              {
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-[1rem] py-[4.4rem]">
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
      </div>
    </div>
  );
};

export default ProductsPage;

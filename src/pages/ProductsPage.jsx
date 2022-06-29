import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import { VscSettings } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import Slider from "rc-slider";
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
import NumberFormat from "react-number-format";

const ProductsPage = () => {
  const { cateId, parentId } = useParams();
  const [category, setCategory] = useState({ id: cateId, name: "" });
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
    limit: 5,
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
        limit: 5,
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
    setFilter({ ...filter, start: 0 });
    window.scrollTo(0, 0);
  };

  const handleCategory = () => {
    setOpenCateList(!openCateList);
  };
  const handleFilter = () => {
    setOpenFilter(!openFilter);
    if (openFilter) {
      window.scrollTo(0, 0);
    }
  };

  const unFilter = () => {
    setFilter({
      start: 0,
      colors: [],
      sizes: [],
      sort: "desc",
      price: [0, -1],
      limit: 5,
      touched: {
        color: false,
        size: false,
        price: false,
        sort: false,
      },
    });
    handleFilter();
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
    else
      setTimeout(() => {
        parentNode.classList.add("overflow-visible");
      }, 300);
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

  const FilterTouched = Object.values(filter.touched).some(
    (touched) => touched
  );

  return (
    <div>
      <div className="flex justify-between px-[2rem] py-[1rem] fixed top-[5.8rem] left-0 right-0 z-10 bg-white ">
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
            <div className="fixed inset-0 z-[1] bg-white mt-[5.8rem] flex flex-col justify-between">
              <ul className="text-[1.8rem] font-semibold px-[2rem] pt-[1rem] overflow-y-auto h-[86vh] ">
                <li className="pt-[2rem] pb-[1rem] border-b border-[#ececec] max-h-[5.8rem]  overflow-hidden transition-all duration-300 bg-white">
                  <button
                    onClick={onFilterClick}
                    className="flex w-[100%] justify-between"
                  >
                    Mức giá <RiArrowDropDownLine size={24} />
                  </button>
                  <p className="pt-[1rem] font-medium text-[1.8rem]">
                    {filter.price[0] < filter.price[1] ||
                    filter.price[1] === -1 ? (
                      <>
                        Từ{" "}
                        <NumberFormat
                          thousandsGroupStyle="thousand"
                          value={filter.price[0]}
                          decimalSeparator="."
                          displayType="text"
                          thousandSeparator={true}
                        />
                        <span className="text-[2rem]">₫</span>
                        {" đến "}
                        <NumberFormat
                          thousandsGroupStyle="thousand"
                          value={
                            filter.price[1] === -1
                              ? maxPrice + 1000
                              : filter.price[1]
                          }
                          decimalSeparator="."
                          displayType="text"
                          thousandSeparator={true}
                        />
                        <span className="text-[2rem]">₫</span>
                      </>
                    ) : (
                      <>
                        <NumberFormat
                          thousandsGroupStyle="thousand"
                          value={
                            filter.price[1] === -1
                              ? maxPrice + 1000
                              : filter.price[1]
                          }
                          decimalSeparator="."
                          displayType="text"
                          thousandSeparator={true}
                        />
                        <span className="text-[2rem]">₫</span>
                      </>
                    )}
                  </p>
                  <div className="px-[1rem] pb-[3rem]">
                    {maxPrice && (
                      <Slider
                        trackStyle={{
                          backgroundColor: "#000",
                        }}
                        handleStyle={{
                          borderColor: "#000",
                        }}
                        activeDotStyle={{
                          borderColor: "#000",
                        }}
                        range
                        step={10}
                        min={0}
                        max={((maxPrice + 1000) / 1000) | 0}
                        defaultValue={[0, ((maxPrice + 1000) / 1000) | 0]}
                        marks={{
                          0: 0,
                          [((maxPrice + 1000) / 1000) | 0]:
                            ((maxPrice + 1000) / 1000) | 0,
                        }}
                        onChange={onFilter("price", "range")}
                      />
                    )}
                  </div>
                </li>
                <li className="pt-[2rem] pb-[1rem] border-b border-[#ececec] max-h-[5.8rem]  overflow-hidden transition-all duration-300 bg-white">
                  <button
                    onClick={onFilterClick}
                    className="flex w-[100%] justify-between"
                  >
                    Màu sắc <RiArrowDropDownLine size={24} />
                  </button>
                  <div className="relative">
                    <div className="mt-[1rem] pb-[2rem] text-[1.4rem] font-[500] grid grid-cols-2 gap-[1.4rem] relative max-h-[52vh] overflow-y-auto">
                      {colors.map(({ id, name }) => (
                        <div key={id}>
                          <input
                            id={`color${id}`}
                            type="checkbox"
                            className="appearance-none peer absolute"
                            value={id}
                            name="colors"
                            checked={filter?.colors.includes(id)}
                            onChange={onFilter("colors", "checkbox")}
                          />
                          <label
                            htmlFor={`color${id}`}
                            className="peer-checked:bg-stone-100 transition-all duration-300 border border-[#ececec] rounded-[0.4rem] text-center py-[1.4rem] block"
                          >
                            {name}
                          </label>
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-[4rem] bg-gradient-to-t from-white"></div>
                  </div>
                </li>
                <li className="pt-[2rem] pb-[1rem] border-b border-[#ececec] max-h-[5.8rem]  overflow-hidden transition-all duration-300 bg-white">
                  <button
                    onClick={onFilterClick}
                    className="flex w-[100%] justify-between"
                  >
                    Kích cỡ <RiArrowDropDownLine size={24} />
                  </button>
                  <div className="py-[2rem] text-[1.6rem] font-[500] grid grid-cols-5 gap-[1.4rem] overflow-y-auto max-h-[60vh]">
                    {sizes.map(({ size }) => (
                      <div key={size} className="relative">
                        <input
                          id={`size${size}`}
                          type="checkbox"
                          className="appearance-none peer absolute"
                          value={size}
                          checked={filter?.sizes.includes(size)}
                          name="sizes"
                          onChange={onFilter("sizes", "checkbox")}
                        />
                        <label
                          htmlFor={`size${size}`}
                          className="peer-checked:bg-stone-100 transition-all duration-300 border border-[#ececec] rounded-[0.4rem] text-center py-[1.4rem] block"
                        >
                          {size}
                        </label>
                      </div>
                    ))}
                  </div>
                </li>
                <li className="pt-[2rem] pb-[1rem] border-b border-[#ececec] max-h-[5.8rem]  overflow-hidden transition-all duration-300 bg-white">
                  <button
                    onClick={onFilterClick}
                    className="flex w-[100%] justify-between"
                  >
                    Sắp xếp <RiArrowDropDownLine size={24} />
                  </button>
                  <div className="py-[2rem] text-[1.6rem] font-[500] grid grid-cols-2 gap-[1.4rem] overflow-y-auto max-h-[60vh]">
                    {[
                      { text: "Giá giảm dần", value: "desc" },
                      { text: "Giá tăng dần", value: "asc" },
                    ].map(({ text, value }, index) => (
                      <div key={index} className="relative">
                        <input
                          id={`sort${value}`}
                          type="radio"
                          className="appearance-none peer absolute"
                          value={value}
                          name="sort"
                          onChange={onFilter("sort", "radio")}
                          checked={filter?.sort === value}
                        />
                        <label
                          htmlFor={`sort${value}`}
                          className="peer-checked:bg-stone-100 transition-all duration-300 border border-[#ececec] rounded-[0.4rem] text-center py-[1.4rem] block"
                        >
                          {text}
                        </label>
                      </div>
                    ))}
                  </div>
                </li>
              </ul>
              <div className="p-[2rem] flex justify-between gap-[1.4rem]">
                <Button
                  onclick={FilterTouched ? unFilter : handleFilter}
                  text={FilterTouched ? "Bỏ chọn" : "Quay lại"}
                  type="outline"
                  className="flex-1"
                />
                <Button
                  onclick={handleFilter}
                  text={FilterTouched ? `Xem ${total} kết quả` : "Áp dụng"}
                  className="flex-1"
                />
              </div>
            </div>
          </CSSTransition>
        </div>
      </div>
      {total < 0 && loading}
      {total === 0 && (
        <h3 className="pt-[10rem] pb-[4.4rem] text-center text-[1.6rem] font-semibold">
          Không có sản phẩm nào!
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

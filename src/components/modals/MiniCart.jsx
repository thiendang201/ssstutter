import React, { forwardRef, useImperativeHandle } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { MdKeyboardBackspace } from "react-icons/md";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import Button from "../../shared/Button";
import { Context } from "../Layout";

const MiniCart = forwardRef((props, ref) => {
  const loadItems = () => JSON.parse(localStorage.getItem("cartItems")) || [];
  const [display, setDisplay] = useState(false);
  const [cartItems, setCartItems] = useState(loadItems());
  const { setCartQty, closeSearch } = useContext(Context);
  const [price, setPrice] = useState({
    sum: 0,
    sale: 0,
    total: 0,
  });

  const openMiniCart = () => setDisplay(true);

  const closeMiniCart = () => setDisplay(false);

  const setItems = (items) => {
    setCartItems(items);
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  const addToCart = (product) => {
    const oldItems = loadItems();
    const existsItem = oldItems.find(({ variantId, size }) => {
      return variantId === product.variantId && size === product.size;
    });

    existsItem?.qty && existsItem.qty++;
    const newList = existsItem ? [...oldItems] : [...oldItems, product];
    setItems(newList);
  };

  useEffect(() => {
    setCartQty && setCartQty(cartItems.length);
  }, [cartItems, setCartQty]);

  useEffect(() => {
    let sum = 0;
    let sale = 0;
    let total = 0;

    cartItems.forEach(({ price, salePrice, qty }) => {
      sum += price * qty;
      sale += salePrice > 0 ? (price - salePrice) * qty : 0;
      total += salePrice > 0 ? salePrice * qty : price * qty;
    });
    setPrice({
      sum,
      sale,
      total,
    });
  }, [cartItems]);

  useImperativeHandle(ref, () => ({
    openMiniCart,
    closeMiniCart,
    addToCart,
  }));

  return (
    <>
      <CSSTransition
        in={display}
        timeout={300}
        classNames="slide-up"
        unmountOnExit
      >
        <div className="fixed inset-0 bg-white z-[12]">
          <div className="flex justify-between items-center pr-[2rem] pl-[0.4rem] border-b border-[#f1f1f1]">
            <button className="py-[1.2rem] px-[1.6rem]" onClick={closeMiniCart}>
              <MdKeyboardBackspace size={32} />
            </button>{" "}
            <h2 className="font-semibold text-[1.8rem]">Giỏ hàng</h2>
          </div>
          <ul className="px-[2rem] pt-[3rem] pb-[1rem] overflow-y-auto max-h-[72%]">
            {cartItems.map(
              ({
                productId,
                name,
                color,
                size,
                qty,
                img_url,
                price,
                salePrice,
              }) => (
                <li key={productId + color + size} className="mt-[2.4rem]">
                  <div className="grid grid-cols-[8rem_1fr] gap-[1.4rem]">
                    <div>
                      <Link
                        to={`../product/${productId}`}
                        onClick={() => {
                          closeSearch();
                          window.scrollTo(0, 0);
                        }}
                        style={{ backgroundImage: `url(${img_url})` }}
                        className=" block pt-[100%] bg-center bg-no-repeat bg-cover group-hover:brightness-90 transition-all duration-300"
                      ></Link>
                    </div>
                    <div>
                      <h2 className="font-semibold text-[1.6rem]">{name}</h2>
                      <p className="text-[1.3rem]">
                        {color + ", size: " + size}
                      </p>
                      <div className="text-[1.8rem] md:flex gap-[0.4rem] items-center tracking-wide">
                        <p>
                          <NumberFormat
                            thousandsGroupStyle="thousand"
                            value={salePrice || price}
                            decimalSeparator="."
                            displayType="text"
                            thousandSeparator={true}
                          />

                          <span className="text-[1.8rem]">₫</span>
                        </p>
                        {salePrice !== 0 && (
                          <p
                            style={{ color: "#aeaeae" }}
                            className="line-through mt-[-0.4rem] md:mt-0 text-[1.4rem]"
                          >
                            <NumberFormat
                              thousandsGroupStyle="thousand"
                              value={price}
                              displayType="text"
                              decimalSeparator="."
                              thousandSeparator={true}
                            />{" "}
                            <span className="text-[1.8rem]">₫</span>
                          </p>
                        )}
                      </div>
                      <div className="inline-flex items-strength mt-[1rem] border border-[#f1f1f1] rounded-[0.6rem]">
                        <button className="text-[2rem] font-semibold px-[1.6rem] ">
                          -
                        </button>
                        <input
                          className="text-[1.6rem] font-semibold w-[5.6rem] border-x border-[#f1f1f1] outline-none text-center"
                          type="text"
                          value={qty}
                        />
                        <button className="text-[2rem] font-semibold px-[1.6rem] ">
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
          <div className="absolute bottom-0 left-0 right-0 p-[2rem]">
            <p className="font-semibold text-[1.6rem] flex justify-between">
              <span>Tổng:</span>
              <div>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={price.sum}
                  displayType="text"
                  decimalSeparator="."
                  thousandSeparator={true}
                />{" "}
                <span className="text-[1.8rem]">₫</span>
              </div>
            </p>
            <p className="font-semibold text-[1.6rem] flex justify-between">
              <span>Ưu đãi:</span>
              <div>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={price.sale}
                  displayType="text"
                  decimalSeparator="."
                  thousandSeparator={true}
                />{" "}
                <span className="text-[1.8rem]">₫</span>
              </div>
            </p>
            <p className="font-semibold text-[1.6rem] flex justify-between">
              <span>Thành tiền:</span>
              <div>
                <NumberFormat
                  thousandsGroupStyle="thousand"
                  value={price.total}
                  displayType="text"
                  decimalSeparator="."
                  thousandSeparator={true}
                />{" "}
                <span className="text-[1.8rem]">₫</span>
              </div>
            </p>
            <Button text="THANH TOÁN" className="w-[100%] mt-[2rem]" />
          </div>
        </div>
      </CSSTransition>
    </>
  );
});

export default MiniCart;

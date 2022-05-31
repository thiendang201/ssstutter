import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Button from "../../shared/Button";
import Product from "../product/Product";

const NewProducts = ({ products = [], categories = [], changeNewProducts }) => {
  return (
    <section className="py-[2.5rem] bg-[#103832]">
      <h1 className="text-center text-[2.8rem] text-[#ffffff] font-semibold">
        WHAT'S NEW
      </h1>
      <div className="py-[2rem] text-white flex gap-[1rem] justify-center">
        {categories.map((category, index) => (
          <Button
            key={category.id}
            {...category}
            type="underline"
            onclick={changeNewProducts(category.id)}
            active={index === 0 ? "active" : ""}
            beforeColor="before:bg-white"
          />
        ))}
      </div>
      <Swiper
        autoplay={{
          delay: 3500,
        }}
        slidesPerView={1.15}
        spaceBetween={10}
        modules={[Autoplay]}
      >
        {products.map((product) => (
          <SwiperSlide key={product.id} className="text-white">
            <Product {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default NewProducts;

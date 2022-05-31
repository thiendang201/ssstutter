import Button from "../../shared/Button";
import Product from "./Product";

const WeeklyBest = ({ products, categories, changeProducts }) => {
  return (
    <section className="py-[2.5rem]">
      <h1 className="text-center text-[2.8rem] text-[#808080] font-semibold">
        WEEKLY BEST
      </h1>
      <div className="pt-[2rem] flex gap-[1rem] justify-center">
        {categories.map((category, index) => (
          <Button
            key={category.id}
            {...category}
            type="underline"
            onclick={changeProducts(category.id)}
            active={index === 0 ? "active" : ""}
            beforeColor="before:bg-[#000000]"
          />
        ))}
      </div>
      <div className="grid grid-cols-40 mt-[2rem] gap-[1rem]">
        {products.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
};

export default WeeklyBest;

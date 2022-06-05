import Product from "./Product";

const Products = ({ products = [] }) => {
  const productList = products.map((product) => (
    <li key={product.id}>
      <Product {...product} />
    </li>
  ));
  return (
    <ul className=" max-h-[69vh] grid grid-cols-40 md:grid-cols-23 mt-[2rem] pb-[1rem] gap-[2rem] overflow-auto">
      {productList}
    </ul>
  );
};

export default Products;

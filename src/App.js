import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category/:cateId" element={<ProductsPage />} />
        <Route path="category/:cateId/:parentId" element={<ProductsPage />} />
        <Route path="product/:productId" element={<ProductDetails />} />
      </Route>
    </Routes>
  );
}

export default App;

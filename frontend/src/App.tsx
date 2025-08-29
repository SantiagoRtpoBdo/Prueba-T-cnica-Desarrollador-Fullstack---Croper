import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ProductsPage from "./pages/ProductsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

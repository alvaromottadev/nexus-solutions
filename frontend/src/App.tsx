import "./App.css";
import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";

function App() {
  return (
    <>
      <Toaster richColors />
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
      </Routes>
    </>
  );
}

export default App;

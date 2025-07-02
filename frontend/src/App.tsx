import "./App.css";
import { Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "sonner";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import LocationsPage from "./pages/LocationsPage";
import InventoryPage from "./pages/InventoryPage";
import MovementPage from "./pages/MovementPage";
import EmployeePage from "./pages/EmployeePage";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./routes/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import { SidebarProvider } from "./components/ui/sidebar";

function App() {
  return (
    <>
      <Toaster richColors />
      <AuthProvider>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route element={<PrivateRoute />}>
            <Route path="home" element={<HomePage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="locations" element={<LocationsPage />} />
            <Route path="inventories" element={<InventoryPage />} />
            <Route path="movements" element={<MovementPage />} />
            <Route path="employees" element={<EmployeePage />} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;

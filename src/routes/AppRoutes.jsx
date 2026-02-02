import { Routes, Route, Navigate } from "react-router-dom";
import UserLayout from "../components/layout/UserLayout";
import AdminLayout from "../components/layout/AdminLayout";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";

// Auth Pages
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Logout from "../pages/auth/Logout";

// User Pages
import Home from "../pages/user/Home";
import ProductList from "../pages/user/ProductList";
import ProductDetail from "../pages/user/ProductDetail";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import MyOrders from "../pages/user/MyOrders";
import Contact from "../pages/user/Contact";

// Admin Pages
import Dashboard from "../pages/admin/Dashboard";
import Products from "../pages/admin/Products";
import CreateProduct from "../pages/admin/CreateProduct";
import EditProduct from "../pages/admin/EditProduct";
import Categories from "../pages/admin/Categories";
import Orders from "../pages/admin/Orders";
import OrderItems from "../pages/admin/OrderItems";
import Users from "../pages/admin/Users";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Default redirect to home */}
      <Route path="/" element={<Navigate to="/home" replace />} />

      {/* Public Auth Routes */}
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/logout" element={<Logout />} />

      {/* Public User Routes - Can view products without login */}
      <Route element={<UserLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/contact" element={<Contact />} />
      </Route>

      {/* Protected User Routes - Need login to access */}
      <Route element={<PrivateRoute><UserLayout /></PrivateRoute>}>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Route>

      {/* Admin Routes - Need admin role */}
      <Route element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/products/create" element={<CreateProduct />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/order-items" element={<OrderItems />} />
        <Route path="/admin/users" element={<Users />} />
      </Route>

      {/* 404 - Redirect to home */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes;

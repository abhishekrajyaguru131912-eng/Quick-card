import './static/css/bootstrap.css';
import './static/css/style.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

import PrivateRoute from './components/PrivateRoute';

// ACCOUNT
import { AccountHome } from './components/account/AccountHome';
import { AddressCards } from './components/account/AddressHome';
import { OrdersCard } from './components/account/OrdersHome';

// ✅ Footer import (components2)
import Footer from './components2/Footer';

function App() {
  return (
    <BrowserRouter>

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* USER */}
        <Route 
          path="/cart" 
          element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/account" 
          element={
            <PrivateRoute>
              <AccountHome />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/address" 
          element={
            <PrivateRoute>
              <AddressCards />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/orders" 
          element={
            <PrivateRoute>
              <OrdersCard />
            </PrivateRoute>
          } 
        />

        {/* ADMIN */}
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute adminOnly>
              <Dashboard />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/admin/products" 
          element={
            <PrivateRoute adminOnly>
              <AdminProducts />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/admin/orders" 
          element={
            <PrivateRoute adminOnly>
              <AdminOrders />
            </PrivateRoute>
          } 
        />

        {/* 404 */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>

      {/* ✅ Footer */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;
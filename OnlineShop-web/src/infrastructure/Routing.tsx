import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthenticatedRoute from './AuthenticatedRoute';
import UnauthenticatedRoute from './UnauthenticatedRoute';

import LoginPage from '../components/authentication/LoginPage';
import RegisterPage from '../components/authentication/RegisterPage';
import Admin from '../components/admin';
import AdminProducts from '../components/admin/products';
import AdminOrders from '../components/admin/orders';
import AdminCustomers from '../components/admin/customers';

import AddProduct from '../components/admin/product/add-product';
import EditProduct from '../components/admin/product/edit-product';
import Sneakers from '../components/sneakers';
import Favorites from '../components/sneakers/components/Favorites';
import Orders from '../components/sneakers/pages/Orders';
import AdminOrdersProducts from '../components/admin/order-products';

import AuthenticatedAdminRoute from './AuthenticatedAdminRoute';
import About from '../components/sneakers/pages/About';
import Contact from '../components/sneakers/pages/Contact';

const Routing = () => (
    <Router>
        <Routes>
            <Route path="/admin" element={<AuthenticatedAdminRoute />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin" element={<Admin />}>
                    <Route path="products" element={<AdminProducts />} />
                    <Route path="products/add" element={<AddProduct />} />
                    <Route
                        path="products/edit/:productId"
                        element={<EditProduct />}
                    />
                    <Route path="orders" element={<AdminOrders />} />
                    <Route path="orders/:userId" element={<AdminOrders />} />
                    <Route path="orders/:userId/:orderId" element={<AdminOrdersProducts />} />

                    <Route path="customers" element={<AdminCustomers />} />
                </Route>
            </Route>
            <Route path="/" element={<UnauthenticatedRoute />}>
                <Route path="/sneakers" element={<Sneakers />} />
                <Route path="/" element={<Sneakers />} />
                <Route path="/favorite" element={<Favorites />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
            </Route>
            <Route path="/login" element={<UnauthenticatedRoute />}>
                <Route path="/login" element={<LoginPage />} />
            </Route>
            <Route path="/register" element={<UnauthenticatedRoute />}>
                <Route path="/register" element={<RegisterPage />} />
            </Route>
            <Route path="*" element={<LoginPage />} />
        </Routes>
    </Router>
);

export default Routing;

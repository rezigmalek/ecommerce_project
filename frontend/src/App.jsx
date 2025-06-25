import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Shop from './components/Shop'
import Product from './components/Product'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Login from './components/admin/Login'
import { ToastContainer, toast } from 'react-toastify';
import Dashboard from './components/admin/Dashboard'
import { AdminRequireAuth } from './components/admin/AdminRequireAuth'
import Show from './components/admin/category/Show'
import Create from './components/admin/category/Create'
import Edit from './components/admin/category/Edit'
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/shop" element={<Shop/>} />
            <Route path="/product" element={<Product/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/checkout" element={<Checkout/>} />
            <Route path="/admin/login" element={<Login/>} />
            <Route path="/admin/dashboard" element={
              <AdminRequireAuth>
                <Dashboard />
              </AdminRequireAuth>
            } />
            <Route path="/admin/categories" element={
              <AdminRequireAuth>
                <Show />
              </AdminRequireAuth>
            } />
            <Route path="/admin/categories/create" element={
              <AdminRequireAuth>
                <Create />
              </AdminRequireAuth>
            } />
            <Route path="/admin/categories/edit/:id" element={
              <AdminRequireAuth>
                <Edit />
              </AdminRequireAuth>
            } />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App

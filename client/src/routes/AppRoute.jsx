import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import ProdcutsView from "../pages/ProdcutsView";
import Product from "../pages/Product";
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/footer/Footer';
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ProtectedRoute from '../pages/ProtectedRoute';
import MainLayout from "../pages/MainLayout";
import Page404 from "../pages/Page404";


const AppRoute = () => {
  return (
    <>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          
          <Route path="/products" element={
            <ProtectedRoute>
              <ProdcutsView />
            </ProtectedRoute>
          } />
          <Route path="/products/id" element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>


        <Route path="*" element={<Page404 />} />
      </Routes>
    </>
  )
}

export default AppRoute
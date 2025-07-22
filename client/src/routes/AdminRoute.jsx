import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../components/Admin/Dashboard'
import Products from '../components/Admin/Products'
import AdminLayout from '../components/Admin/AdminLayout'
import ProtectedAdminRoute from '../pages/ProtectedAdminRoute'

const AdminRoute = () => {
  return (
    <Routes>
      <Route path='/admin' element={
        <ProtectedAdminRoute>
          <AdminLayout />
        </ProtectedAdminRoute>
      } >
        <Route index element={<Dashboard />} />
        <Route path='products' element={<Products />} />
      </Route>
    </Routes>


  )
}

export default AdminRoute
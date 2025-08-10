import { Route, Routes } from 'react-router-dom'
import Products from '../components/Admin/Products'
import AdminLayout from '../pages/AdminLayout'
import ProtectedAdminRoute from '../pages/ProtectedAdminRoute'
import Page404 from '../pages/Page404'
import Orders from '../components/Admin/Orders'

const AdminRoute = () => {
  return (
    <Routes>
      <Route path='/admin' element={
        <ProtectedAdminRoute>
          <AdminLayout />
        </ProtectedAdminRoute>
      } >
        <Route index element={<Orders />} />
        <Route path='products' element={<Products />} />\
        <Route path='orders' element={<Orders />} />
        <Route path='*' element={<Page404 />} />
      </Route>
    </Routes>


  )
}

export default AdminRoute
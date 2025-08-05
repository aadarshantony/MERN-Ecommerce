import 'flowbite';
import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import { Toaster } from 'react-hot-toast';
import { ModalProvider } from './context/ModalContext';

const AppRoute = lazy(() => import("./routes/AppRoute"));
const AdminRoute = lazy(() => import("./routes/AdminRoute"));

function App() {
  const location = useLocation()
  const isAdminPath = location.pathname.startsWith('/admin');
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        <Toaster position='top-center' />
        {isAdminPath ? <AdminRoute /> : (
          <ModalProvider>
            <AppRoute />
          </ModalProvider>
        )}
      </Suspense>
    </>
  )
}

export default App

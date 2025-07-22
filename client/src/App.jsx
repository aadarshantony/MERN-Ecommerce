import 'flowbite';
import { Suspense, lazy } from "react";
import { useLocation } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";

const AppRoute = lazy(() => import("./routes/AppRoute"));
const AdminRoute = lazy(() => import("./routes/AdminRoute"));

function App() {
  const location = useLocation()
  const isAdminPath = location.pathname.startsWith('/admin');
  return (
    <>
      <Suspense fallback={<LoadingScreen />}>
        {isAdminPath ? <AdminRoute /> : <AppRoute />}
      </Suspense>
    </>
  )
}

export default App

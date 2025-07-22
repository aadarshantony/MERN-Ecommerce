import { useAuth } from "../context/AuthContext"
import LoadingScreen from '../components/LoadingScreen'
import { Navigate  } from "react-router-dom";
import Page403 from "./Page403";
const ProtectedAdminRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <LoadingScreen />;

    if(!user ) return <Navigate to={'/login'} replace/>
    if(user.role !== "admin") return <Page403 />

    return children;
}

export default ProtectedAdminRoute;
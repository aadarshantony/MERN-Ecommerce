import { useAuth } from "../context/AuthContext"
import LoadingScreen from '../components/LoadingScreen'
import { Navigate  } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) return <LoadingScreen />;

    if(!user) return <Navigate to={'/login'} replace/>

    return children;
}

export default ProtectedRoute;
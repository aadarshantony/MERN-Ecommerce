import { useAuth } from "../context/AuthContext"
import LoadingScreen from '../components/LoadingScreen'
import Page401 from "./Page401"
const ProtectedRoute = ({ children }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) return <LoadingScreen />;

    if (!user) return <Page401 />

    return children;
}

export default ProtectedRoute;
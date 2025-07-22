import Navbar from "../components/navbar/Navbar";
import Footer from "../components/footer/Footer";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
    return (
        <>
            <Navbar />
            <Toaster position='top-center'/>
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;

import { useEffect, useState } from "react";
import loadinSvg from '../assets/productsLoading.svg'
const LoadingScreen = () => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShow(true), 300);
        return () => clearTimeout(timer);
    }, []);

    if (!show) return null;

    return (
        <div className="flex justify-center items-center h-screen bg-white flex-col">
            <img src={loadinSvg} alt="loading-screen" className="h-[500px]"/>
            <a href="https://storyset.com/web" className="text-gray-400 font-light pt-3">Web illustrations by Storyset</a>
        </div>
    );
};

export default LoadingScreen;

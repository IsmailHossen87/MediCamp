import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Shared/Navbar";
import Footer from "../Shared/Footer";

const MainLayOut = () => {
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes('login') ||  location.pathname.includes('register')
    return (
        <div className="container mx-auto">
           {
            noHeaderFooter ||  <Navbar/>
           }
            <Outlet></Outlet>
            {
                noHeaderFooter || <Footer/>
            }
        </div>
    );
};

export default MainLayOut;
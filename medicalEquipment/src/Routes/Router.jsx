import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayOut from "../Components/MainLayOut";
import Home from "../Components/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Components/DashBoard/DashBoard";

const Router = createBrowserRouter([
    {
        path:'/',
        element:<MainLayOut></MainLayOut>,
        children:[
            {
                path:'/',
                element:<Home/>,
            },
            {
                path:'/login',
                element:<Login/>,
            },
            {
                path:'/register',
                element:<Register/>,
            },
        ]
    },
    {
        path:'/dashboard',
        element:<PrivateRoute><DashBoard/></PrivateRoute>,
    },
])

export default Router;
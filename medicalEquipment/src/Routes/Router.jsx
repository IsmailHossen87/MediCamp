import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayOut from "../Components/MainLayOut";
import Home from "../Components/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Components/DashBoard/DashBoard";
import RegisterCamp from "../Components/UserDashBoard/RegisterCamp";
import Analaytics from "../Components/UserDashBoard/Analaytics";
import AddCamp from "../Components/AdminDashBoard/AddCamp";
import ManageCamp from "../Components/AdminDashBoard/ManageCamp";
import ManageRegCamp from "../Components/AdminDashBoard/ManageRegCamp";
import Alluser from "../Components/AdminDashBoard/Alluser";
import ReausableProfile from "../Shared/ReausableProfile";
import UpdateCamp from "../Components/AdminDashBoard/UpdateCamp";

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
        children:[
            {
                index:true,
                element:<ReausableProfile/>
            },
            {
                path:'ParticipantUser',
                element:<ReausableProfile/>
            },
            {
                path:'Registered',
                element:<RegisterCamp/>
            },
            // {
            //     path:'Payment',
            //     element:<ParticipentProfile/>
            // },
            {
                path:'Analytics',
                element:<Analaytics/>
            },
            // admin
            {
                path:'adminProfile',
                element:<ReausableProfile/>
            },
            {
                path:'AddCamp',
                element:<AddCamp/>
            },
            {
                path:'ManageCamp',
                element:<ManageCamp/>
            },
            {
                path:'updateCamp/:id',
                element:<UpdateCamp/>
            },
            {
                path:'ManageRegCamp',
                element:<ManageRegCamp/>
            },
            {
                path:'Alluser',
                element:<Alluser/>
            },

        ]
    },
])

export default Router;
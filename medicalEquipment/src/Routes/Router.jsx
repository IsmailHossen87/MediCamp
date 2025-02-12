import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayOut from "../Components/MainLayOut";
import Home from "../Components/Home";
import Login from "../Authentication/Login";
import Register from "../Authentication/Register";
import PrivateRoute from "./PrivateRoute";
import DashBoard from "../Components/DashBoard/DashBoard";
import ParticipentProfile from "../Components/UserDashBoard/ParticipentProfile";
import RegisterCamp from "../Components/UserDashBoard/RegisterCamp";
import Analaytics from "../Components/UserDashBoard/Analaytics";

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
                path:'ParticipantUser',
                element:<ParticipentProfile/>
            },
            {
                path:'Registered',
                element:<RegisterCamp/>
            },
            {
                path:'Payment',
                element:<ParticipentProfile/>
            },
            {
                path:'Analytics',
                element:<Analaytics/>
            }
        ]
    },
])

export default Router;
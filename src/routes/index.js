
import CategoryPicture from "~/components/containers/Chat/resource/CategoryPicture";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import Category from "~/pages/Category";
import Checkout from "~/pages/CheckOut";
import Dashboard from "~/pages/Dashboard";
import Error from "~/pages/Errorr";
import ForgotPassword from "~/pages/ForgotPassword";
import Profile from "~/pages/Profile";
import VerifyAccount from "~/pages/VerifyAccount";


const { default: Home } = require("~/pages/Home");
const { default: Login } = require("~/pages/Login");
const { default: Register } = require("~/pages/Register");
const { default: Search } = require("~/pages/Search");


const PublicRoutes = [
    { path: '/', component: Home, },
    { path: '/login', component: Login, },
    { path: '/register', component: Register, },
    { path: '/forgot-password', component: ForgotPassword, },
    { path: '/error', component: Error, layout: null},
    { path: '/category-details/:id', component: Category, },
    { path: '/search', component: Search,}, // layout: null
    { path: '/profile', component: Profile, layout: null}, // layout: null
    { path: '/checkout', component: Checkout,}, // layout: null
    { path: '/verify-success', component: VerifyAccount, layout: null}, // 
    { path: '/dashboard', component: Dashboard, layout: DashboardLayout }, // 
    { path: '/test', component: CategoryPicture, layout: null }, // 
];

// const PrivateRoutes = [

// ];

export { PublicRoutes };
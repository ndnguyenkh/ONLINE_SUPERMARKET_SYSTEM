
import CategoryPicture from "~/components/containers/Chat/resource/CategoryPicture";
import DashboardLayout from "~/components/layouts/DashboardLayout";
import Category from "~/pages/Category";
import Checkout from "~/pages/CheckOut";
import Dashboard from "~/pages/Dashboard";
import ErrorPay from "~/pages/ErrorPay";
import Error from "~/pages/Errorr";
import ForgotPassword from "~/pages/ForgotPassword";
import ManageCategory from "~/pages/ManageCategory";
import ManageOrders from "~/pages/ManageOrders";
import ManageProduct from "~/pages/ManageProduct";
import ManagePromotion from "~/pages/ManagePromotion";
import ManageProviders from "~/pages/ManageProviders";
import ManageSchedule from "~/pages/ManageSchedule";
import ManageStock from "~/pages/ManageStock";
import ManageUser from "~/pages/ManageUser";
import PaySuccess from "~/pages/Pay";
import Profile from "~/pages/Profile";
import ResetPassword from "~/pages/ResetPassword";
import SeenSchedule from "~/pages/SeenSchedule";
import VerifyAccount from "~/pages/VerifyAccount";


const { default: Home } = require("~/pages/Home");
const { default: Login } = require("~/pages/Login");
const { default: Register } = require("~/pages/Register");
const { default: Search } = require("~/pages/Search");


const PublicRoutes = [
    { path: '/', component: Home, },
    { path: '/login', component: Profile, },
    { path: '/loginn', component: Login, },
    { path: '/register', component: Register, },
    { path: '/forgot-password', component: ForgotPassword, },
    { path: '/reset-password/:token', component: ResetPassword, layout: null},
    { path: '/error', component: Error, layout: null},
    { path: '/payment-failed', component: ErrorPay, layout: null},
    // { path: '/category-details/:id', component: Category, },
    { path: '/category-details/:name', component: Category, },
    { path: '/search', component: Search,}, // layout: null
    { path: '/profile', component: Profile, }, // layout: null
    { path: '/checkout', component: Checkout,}, // layout: null
    { path: '/verify-success', component: VerifyAccount, layout: null}, // 
    { path: '/dashboard', component: Dashboard, layout: DashboardLayout }, // 
    { path: '/test', component: CategoryPicture, layout: null }, // /pay-success
    { path: '/pay-success', component: PaySuccess, layout: null }, // /pay-success

    //
    { path: '/manage-providers', component: ManageProviders, layout: DashboardLayout }, // 
    { path: '/manage-categories', component: ManageCategory, layout: DashboardLayout }, // 
    { path: '/manage-products', component: ManageProduct, layout: DashboardLayout }, // 
    { path: '/manage-orders', component: ManageOrders, layout: DashboardLayout }, // 
    { path: '/manage-accounts', component: ManageUser, layout: DashboardLayout }, // 
    { path: '/manage-stock', component: ManageStock, layout: DashboardLayout }, // 
    { path: '/manage-promotion', component: ManagePromotion, layout: DashboardLayout }, //
    { path: '/manage-schedule', component: ManageSchedule, layout: DashboardLayout }, //
    { path: '/seen-schedule', component: SeenSchedule, layout: DashboardLayout }, //
    
];

// const PrivateRoutes = [

// ];

export { PublicRoutes };
import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts.jsx/MainLayouts";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Register/Signup";
import FindRoommate from "../Pages/Find Roommate/FindRoommate";
import BrowseListing from "../Pages/Browse Listing/BrowseListing";
import MyListings from "../Pages/My Listings/MyListings";
import PrivateRoutes from "../Provider/PrivateRoutes";
import UpdatePost from "../Pages/UpdatePost/UpdatePost";
import Profile from "../Pages/Profile/Profile";
import ListingDetails from "../Components/listingDetails";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import WebInfo from "../Layouts/WebInfo";
import AboutUs from "../WebsiteInfo/AboutUs";
import ContactUs from "../WebsiteInfo/ContactUs";
import Jobs from "../WebsiteInfo/Jobs";
import PressKit from "../WebsiteInfo/PressKit";
import Dashboard from "../Pages/Dashboard/Dashboard";
import Default from "../Pages/Dashboard/Default";
import AllListing from "../Pages/AllListing/AllListing";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "/add-listing-to-find-roommate",
                element: <PrivateRoutes><FindRoommate /></PrivateRoutes>
            },
            {
                path: "/all-listing",
                element: <AllListing/>
            },
            {
                path: "/details/:id",
                element: <PrivateRoutes> <ListingDetails /> </PrivateRoutes>
            },
            {
                path: "/browse-listing",
                element: <PrivateRoutes><BrowseListing /></PrivateRoutes>
            },
            {
                path: "/my-listings",
                element: <PrivateRoutes><MyListings /></PrivateRoutes>
            },
            {
                path: "/my-listing/update/:id",
                element: <PrivateRoutes><UpdatePost /></PrivateRoutes>
            },
        ],
        errorElement: <ErrorPage></ErrorPage>
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard /></PrivateRoutes>,
        children: [
            {
                index: true,
                element: <Default />
            },
            {
                path: "/dashboard/my-listings",
                element: <MyListings />
            },
            {
                path: "/dashboard/browse-listing",
                element: <BrowseListing />
            },
            {
                path: "/dashboard/add-listing-to-find-roommate",
                element: <FindRoommate />
            },
            {
                path: "/dashboard/my-listing/update/:id",
                element: <UpdatePost />
            },
            {
                path: "/dashboard/details/:id",
                element: <ListingDetails />
            },
            {
                path: "/dashboard/my-profile",
                element: <Profile />
            }
        ]
    },
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                path: "/auth/login",
                element: <Login />
            },
            {
                path: "/auth/signup",
                element: <Signup />
            }
        ]
    },
    {
        path: '/webinfo',
        element: <WebInfo />,
        children: [
            {
                path: "/webinfo/aboutus",
                element: <AboutUs />
            },

            {
                path: "/webinfo/contact",
                element: <ContactUs />
            },
            {
                path: "/webinfo/jobs",
                element: <Jobs />
            },
            {
                path: "/webinfo/presskit",
                element: <PressKit />
            },

        ]
    }
]);

export default router;

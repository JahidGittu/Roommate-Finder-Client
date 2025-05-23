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
import Error from "../Pages/404Error/4040Error";

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
                path: "/details/:id",
                element: <PrivateRoutes> <ListingDetails/> </PrivateRoutes>
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
            {
                path: "/my-profile",
                element: <PrivateRoutes><Profile /></PrivateRoutes>
            }
        ],
        errorElement:<Error/>
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
    }
]);

export default router;

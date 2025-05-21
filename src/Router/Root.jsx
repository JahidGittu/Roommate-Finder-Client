import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts.jsx/MainLayouts";
import Home from "../Pages/Home/Home";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import Login from "../Pages/Login/Login";
import Signup from "../Pages/Register/Signup";
import FindRoommate from "../Pages/Find Roommate/FindRoommate";
import BrowseListing from "../Pages/Browse Listing/BrowseListing";
import MyListings from "../Pages/My Listings/MyListings";

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
                path: "/add-to-find-roommate",
                element: <FindRoommate />
            },
            {
                path: "/browse-listing",
                element: <BrowseListing />
            },
            {
                path:"/my-listing",
                element:<MyListings/>
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
    }
]);

export default router;

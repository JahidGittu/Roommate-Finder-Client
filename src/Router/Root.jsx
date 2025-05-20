import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts.jsx/MainLayouts";
import Home from "../Pages/Home/Home";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts />,
        children: [
            {
                index: true,
                element: <Home />
            },
        ]
    },
]);

export default router;

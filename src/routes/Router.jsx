import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import CafeDetail from "../pages/CafeDetail";
import Splash from "../pages/Splash";
import SignUp from "../pages/SignUp";
import LogIn from "../pages/LogIn";
import Mypage from "../pages/Mypage";
import CafeResultsList from "../pages/CafeResultsList";
import ProtectedRouter from "./ProtectedRouter";
import useUserStore from "../stores/useUserStore";

const { userData } = useUserStore;

const publicRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/splash", element: <Splash /> }
    ]
  }
];

const uncertifiedRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/log-in", element: <LogIn /> },
      { path: "/sign-up", element: <SignUp /> }
    ]
  }
];

const certifiedRoutes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <ProtectedRouter />,
        children: [
          {
            path: "/my-page",
            element: <Mypage />
          },
          {
            path: "/cafe-detail",
            element: <CafeDetail />
          },
          {
            path: "/cafe-results-list",
            element: <CafeResultsList />
          }
        ]
      }
    ]
  }
];

const routes = createBrowserRouter([...publicRoutes, ...(userData ? [] : uncertifiedRoutes), ...certifiedRoutes]);

const Router = () => {
  return <RouterProvider router={routes} />;
};

export default Router;

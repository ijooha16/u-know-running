import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";
import CafeDetail from "../pages/CafeDetail";
import Splash from "../pages/Splash";
import SignUp from "../pages/Signup";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/my-page" element={<MyPage />}></Route> */}
          {/* <Route path="/log-in" element={<Login />}></Route> */}
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/cafe-detail" element={<CafeDetail />}></Route>
          <Route path="/splash" element={<Splash />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

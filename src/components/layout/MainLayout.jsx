import { Link, Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import Button from "../common/Button";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen justify-center items-center">
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="colored"
        />
        <Header />
        <main className="flex-1 flex items-center">
          <Outlet />
        </main>
        <Footer />
      </div>
      {/* 이거 Home.jsx로 가져가기 */}
      <Link to="/cafe-list">
        <Button icon="hamburger_white" text="목록으로 보기" className="fixed bottom-[40px] right-[40px]" />
      </Link>
    </>
  );
};

export default Layout;

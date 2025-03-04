import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";

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
    </>
  );
};

export default Layout;

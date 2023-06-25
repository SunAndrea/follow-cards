import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import AppBar from "../AppBar/AppBar";
// import { Footer } from "../Footer/Footer";
// import { Loader } from "../Loader/Loader";

const Layout: React.FC = () => {
  return (
    <>
      <AppBar />
      <Suspense fallback={<div>Loading</div>}>
        <Outlet />
      </Suspense>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;

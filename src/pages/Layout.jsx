import React from "react";
import Footer from "../components/MainFooter.jsx";
import Navbar from "../components/Navbar.jsx";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;

import React, { ReactNode } from "react";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const HomeTemplates = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-dark-blue text-white min-h-screen">
      <Navbar />
      <div className="mx-auto pt-24">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeTemplates;

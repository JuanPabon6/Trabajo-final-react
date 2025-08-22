import React from "react";
import { Navbar } from "../../components/Navbar";

export const PublicLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

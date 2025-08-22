import React from "react";
import { PrivateNavbar } from "./PrivateNavbar";

export const AdminLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <PrivateNavbar />
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
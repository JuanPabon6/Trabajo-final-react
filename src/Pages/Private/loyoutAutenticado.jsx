import React from "react";
import { NavbarAutenticado } from "./navbarAutenticado";

export const LoyoutAutenticado =  ({children}) =>{
    return(
        <div className="min-h-screen flex flex-col">
      <NavbarAutenticado />
      <main>{children}</main>
    </div>
    )
}
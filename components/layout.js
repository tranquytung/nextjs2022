import React from "react";
import NavBar from "./navbar";
import Notify from "./notify";

export default function Layout({children}){
    return(
        <div className="container">
            <NavBar/>
            <Notify/>
            {children}
        </div>
    )
}
import React, { useState, useEffect } from "react";
import Sidebar from "./AdminLTE/Sidebar";
import Navbar from "./AdminLTE/Navbar";
import Footer from "./AdminLTE/Footer";
import Preload from "./AdminLTE/Preload";

const PlantillaBase = ({ html }) => {

    return (
        <div className="wrapper" >
            <Navbar />
            <Sidebar />

            <div className="content-wrapper pt-4 position-relative">
                {html}
            </div>

            <Footer />
        </div>
    );
};

export default PlantillaBase;

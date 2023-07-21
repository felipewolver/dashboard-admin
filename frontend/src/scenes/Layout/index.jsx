/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";


const Layout = () => {

    const isNonMobile = useMediaQuery('(min-width: 600px)'); // variável q vai alternar para responsivo se não eh mobile ou eh.. quando tiver em 600px 

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return ( 
       
        <Box display={isNonMobile ? "flex" : "block"} width='100%' heigth='100%' >
            <Sidebar 
                isNonMobile={isNonMobile}
                drawerWidth='250px' // Largura da sidebar.
                isSideBarOpen={isSidebarOpen}
                setIsSideBarOpen={setIsSidebarOpen}
            />

            <Box flexGrow={1}>
                <Navbar
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen} 
                 />
                <Outlet />

            </Box>
        </Box>
    
    );    
    
}

export default Layout;
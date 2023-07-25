/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

import { useGetUserQuery } from "../../state/api";


const Layout = () => {

    const isNonMobile = useMediaQuery('(min-width: 600px)'); // variável q vai alternar para responsivo se não eh mobile ou eh.. Vai iniciar não responsivo, soh quando a tela tiver 600px 

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    /* useSelector vai buscar o userId de initialState da pasta state/index.js 
       onde tem as configurações do globalSlice */
    const userId = useSelector((state) => state.global.userId );

    const { data } = useGetUserQuery(userId);
    // console.log("User: ", data); para testar se esta buscando o id

    return ( 
       
        <Box display={isNonMobile ? "flex" : "block"} width='100%' heigth='100%' >
            <Sidebar // propiedades da Sidebar vinda como parametro do component Sidebar q recebe as variáveis de mesmo nome
                user={data || {}}
                isNonMobile={isNonMobile}
                drawerWidth='250px' // Largura da sidebar q foi configurada diretamente aqui.
                isSideBarOpen={isSidebarOpen}
                setIsSideBarOpen={setIsSidebarOpen}
            />

            <Box flexGrow={1}>
                <Navbar
                    user={data || {}}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen} 
                 />
                <Outlet />

            </Box>
        </Box>
    
    );    
    
}

export default Layout;
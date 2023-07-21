/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { LightModeOutlined, 
    DarkModeOutlined,
    Menu as MenuIcon,
    Search,
    SettingsOutlined,
    ArrowDropDownOutlined 
} from "@mui/icons-material";

import FlexBetween from "../FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "../../state";
import profileImage from "../../assets/perfil2.png";
import { 
    AppBar, // <header> em html 
    useTheme, 
    Toolbar, // <div semâtica..
    IconButton, // <button
    InputBase } from "@mui/material";



const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {

    const theme = useTheme(); // O useTheme() vai executar a prop theme exportada de <ThemeProvider do App.jsx onde theme tem a função createTheme(t...)
    const dispatch = useDispatch(); // dispatch vai executar a reducer setMode() da pasta state no evento onClick={} q vai se tornar uma action.

    return (
 
        <AppBar 
            sx={{
                position: 'static',
                background: 'none',
                boxShadow: 'none'
            }} 
        >

            <Toolbar sx={{ justifyContent: 'space-between' }} > 
                {/* Left Side */}
                <FlexBetween>
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)} > {/* se o sidebar estah aberto o ! q a negação vai fechar a sidebar */}
                        <MenuIcon />
                    </IconButton>
                    <FlexBetween 
                        backgroundColor={theme.palette.background.alt}
                        borderRadius='9px'
                        gap='3rem'
                        p='0.5rem 1.5rem'
                    >
                        <InputBase placeholder="Search..." />
                        <IconButton>
                            <Search />
                        </IconButton>

                    </FlexBetween>

                </FlexBetween>

                {/* Right Side */}
                <FlexBetween gap='1.5rem'>
                    <IconButton onClick={() => dispatch(setMode()) }>
                        { theme.palette.mode === 'dark' ? (
                            <DarkModeOutlined sx={{ fontSize: '25px' }} />
                        ) : (
                            <LightModeOutlined sx={{ fontSize: '25px' }} />
                        )}

                    </IconButton>
                    <IconButton>
                        <SettingsOutlined sx={{ fontSize: '25px' }} />
                    </IconButton>
                </FlexBetween>

            </Toolbar>

        </AppBar>
  
    );

}

export default Navbar;
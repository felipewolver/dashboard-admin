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
    InputBase, 
    Box,
    Typography,
    Button,
    Menu,
    MenuItem} from "@mui/material";



const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {

    const theme = useTheme(); // O useTheme() vai executar a prop theme exportada de <ThemeProvider do App.jsx onde theme tem a função createTheme(t...)
    const dispatch = useDispatch(); // dispatch vai executar a reducer setMode() da pasta state no evento onClick={} q vai se tornar uma action.

    const [anchorEl, setAnchorEl] = useState(null)
    const isOpen = Boolean(anchorEl);


    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

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
                    <FlexBetween>
                        <Button onClick={handleClick} sx={{ 
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            textTransform: 'none',
                            gap: '1rem'  }} 
                        > 
                            <Box component="img" alt="profile"
                                src={profileImage}
                                height="32px"
                                width="32px"
                                borderRadius="50%"
                                sx={{ objectFit: "cover" }}    
                            />
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.9rem" sx={{ color: theme.palette.secondary[100] }} > 
                                    {user.name}

                                </Typography>
                                <Typography fontWeight="bold" fontSize="0.8rem" sx={{ color: theme.palette.secondary[200] }} > 
                                    {user.occupation}

                                </Typography>
                            </Box>
                            <ArrowDropDownOutlined 
                                    sx={{ color: theme.palette.secondary[300], fontSize: '25px' }} 
                            />
                        </Button>
                        <Menu anchorEl={anchorEl} open={isOpen} 
                            onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                        >
                            <MenuItem onClick={handleClose}> Log Out </MenuItem>

                        </Menu>

                    </FlexBetween>

                </FlexBetween>

            </Toolbar>

        </AppBar>
  
    );

}

export default Navbar;
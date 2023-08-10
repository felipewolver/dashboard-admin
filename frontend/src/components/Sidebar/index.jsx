/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { 
    Box, // <div>
    Divider, 
    Drawer,
    IconButton,
    List, // ul
    ListItem, // li
    ListItemButton,
    ListItemIcon,
    ListItemText, // <span
    Typography,
    useTheme
} from "@mui/material";

import { 
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutline
} from "@mui/icons-material";

import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween";
import profileImage from "../../assets/perfil2.png";


// Icones da Sidebar
const navItems = [
    {
        text: "Dashboard",
        icon: <HomeOutlined />
    },
    {
        text: "Client facing",
        icon: null
    },
    {
        text: "Products",
        icon: <ShoppingCartOutlined />
    },
    {
        text: "Customers",
        icon: <Groups2Outlined />
    },
    {
        text: "Transactions",
        icon: <ReceiptLongOutlined />
    },
    {
        text: "Geography",
        icon: <PublicOutlined />
    },
    {
        text: "Sales",
        icon: null
    },
    {
        text: "Overview",
        icon: <PointOfSaleOutlined />
    },
    {
        text: "Daily",
        icon: <TodayOutlined />
    },
    {
        text: "Monthly",
        icon: <CalendarMonthOutlined />
    },
    {
        text: "Breakdown",
        icon: <PieChartOutline />
    },
    {
        text: "Management",
        icon: null
    },
    {
        text: "Admin",
        icon: <AdminPanelSettingsOutlined />
    },
    {
        text: "Performance",
        icon: <TrendingUpOutlined />
    },
];

const Sidebar = ({ 
    user,
    drawerWidth,
    isSideBarOpen,
    setIsSideBarOpen,
    isNonMobile
    }) => {
    
    const { pathname } = useLocation();
    const [active, setActive] = useState(''); // variável de controle pra alternar a cor de textos e ícones e alterna a Url atual.
    const navigate = useNavigate();
    const theme = useTheme();
    
    useEffect(() => {
        setActive(pathname.substring(1));

    }, [pathname])

    
    return (
        
        <Box component="nav">
            {isSideBarOpen && (
                <Drawer 
                    open={isSideBarOpen} 
                    onClose={() => setIsSideBarOpen(false)}
                    variant="persistent"
                    anchor="left"
                    sx={{
                        width: drawerWidth,
                        "& .MuiDrawer-paper": { // Sobrescrevendo o estilo da classe .MuiDrawer.. da sidebar com &
                            color: theme.palette.secondary[200],
                            backgroundColor: theme.palette.background.alt,
                            boxSizing: 'border-box',
                            borderWidth: isNonMobile ? 0 : '2px',
                            width: drawerWidth
                        }
                    }}    
                > 
                    <Box width='100%'>
                        <Box m='1.5rem 2rem 2rem 3rem'>
                            <FlexBetween color={theme.palette.secondary.main}>
                                <Box display='flex' alignItems='center' gap='0.5rem'>
                                    <Typography variant="h4" fontWeight="bold">
                                        ECOMVISION
                                    </Typography>
                                </Box>
                                {!isNonMobile && ( // A negação vai dizer q eh o oposto do não responsivo, ou seja se estah em modo responsivo, vai aparecer o icone ChevronLeft
                                    <IconButton onClick={() => setIsSideBarOpen(!isSideBarOpen)}> {/* a negação(!) vai fechar a sidebar quando clicar no botao q por padrao, iniciava com true */}
                                        <ChevronLeft />

                                    </IconButton>
                                )}

                            </FlexBetween>
                        </Box>
                        <List>
                            {navItems.map(({text, icon}) => {
                                if(!icon) { // Soh vai retornar os textos onde o icone = null do array navItens, ou seja, onde não tem icone
                                    return (
                                        <Typography key={text} sx={{ m: '2.25rem 0 1rem 3rem' }}> 
                                            {text} 
                                        </Typography>
                                    )
                                }
                                
                                /* variável lcText(lower case text) q vai pegar os texts do array navItens e 
                                   converter em minusculo ex: Products para products */
                                const lcText = text.toLowerCase();

                                return (
                                    <ListItem key={text} disablePadding >
                                        <ListItemButton 
                                            onClick={() => {
                                                navigate(`/${lcText}`); // Ao clicar num <ListItemButton, o navigate vai pegar o text e colocar numa url para ir para outra página Ex: localhost:5173/products
                                                setActive(lcText); // ao clicar em um texto, eh colocado o texto no setActive q foi armazenado na const lcText
                                            } } 
                                            sx={{ 
                                                backgroundColor: active === lcText ? // o active tem lcText, entao ele coloca a paleta 300 senao fica transparente
                                                theme.palette.secondary[300] : 'transparent',
                                                color: active === lcText ? 
                                                theme.palette.primary[600] : theme.palette.secondary[200], 
                                            }}
                                        > 
                                            <ListItemIcon 
                                                sx={{  
                                                    ml: '2rem', // margin a esquerda dos icones do array navItens
                                                    color: active === lcText ? theme.palette.primary[600] : theme.palette.secondary[200],
                                                }}
                                            >
                                                { icon }
                                            </ListItemIcon>
                                            <ListItemText primary={text} />
                                            {active === lcText && ( // o icone chevronR... soh vai aparecer nas url atuais. se estou na pagina dashboard o icone aparece do lado direito do texto sendo a url atual, se for em outra pag. vai seguir o mesmo processo.
                                                <ChevronRightOutlined sx={{ ml: 'auto' }} />
                                            )}

                                        </ListItemButton>

                                    </ListItem>
                                )

                            }) }
                        </List>

                    </Box>

                    <Box position="absolute" bottom="-20rem" >
                        <Divider />
                        <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem" >
                            <Box component="img" alt="profile"
                                src={profileImage}
                                height="40px"
                                width="40px"
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
                            <SettingsOutlined sx={{
                                color: theme.palette.secondary[300],
                                fontSize: "25px" }} 
                            />

                        </FlexBetween>

                    </Box>

                </Drawer>
            
            )} 
        </Box>
    );

}


export default Sidebar;
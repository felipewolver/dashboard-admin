/* eslint-disable no-unused-vars */
import React from "react";
import { Box, useTheme, Button, Typography, useMediaQuery } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { DownloadOutlined,
    Email,
    PointOfSale,
    PersonAdd,
    Traffic
} from "@mui/icons-material";

import BreakdownChart from "../../components/BreakdownChart";
import OverviewChart from "../../components/OverviewChart";

import Header from "../../components/Header";
import FlexBetween from "../../components/FlexBetween";
import StatBox from "../../components/StatBox";
import { useGetDashboardStatsQuery } from "../../state/api";


// https://nivo.rocks/pie/canvas/ para mais charts(gráficos)
const Dashboard = () => {

    const theme = useTheme();
    const isNonMediaScreen = useMediaQuery("(min-width: 1200px)");
    const { data, isLoading } = useGetDashboardStatsQuery(); //console.log(data);


    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`
        },
    ]



    return (

        <Box m="1.5rem 2.5rem">
            <FlexBetween>
                <Header title="Dashboard" subtitle="Bem-vindo ao seu dashboard" />

                <Box>
                    <Button sx={{ backgroundColor: theme.palette.secondary.light,
                            color: theme.palette.background.alt,
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px"
                        }}
                    >
                        <DownloadOutlined sx={{ mr: "10px" }} /> 
                        Download Reports

                    </Button>
                </Box>

            </FlexBetween>

            <Box mt="20px" 
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="160px"
                gap="20px"
                sx={{ "& > div": { gridColumn: isNonMediaScreen ? undefined : "span 12" } }} // sapn 12 eh o modo responsivo q vai expandir a coluna do elemento a tela inteira
            >  
                {/* ROW 1 */}
                <StatBox title="Total Customers"
                    value={data && data.totalCustomers}
                    increase="+14%"
                    description="Ultimo mês"
                    icon={
                        <Email sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                />

                <StatBox title="Sales Today"
                    value={data && data.todayStats.totalSales}
                    increase="+21%"
                    description="Ultimo mês"
                    icon={
                        <PointOfSale sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                /> 
                <Box gridColumn="span 8"
                    gridRow="span 2"
                    backgroundColor={theme.palette.background.alt}
                    p="1rem"
                    borderRadius="0.55rem"
                >
                    <OverviewChart view="sales" isDashboard={true} />
                </Box>
                      
                <StatBox title="Monthly Sales"
                    value={data && data.thisMonthStats.totalSales}
                    increase="+5%"
                    description="Ultimo mês"
                    icon={
                        <PersonAdd sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                /> 

                <StatBox title="Yearly Sales"
                    value={data && data.yearlySalesTotal}
                    increase="+43%"
                    description="Ultimo mês"
                    icon={
                        <Traffic sx={{ color: theme.palette.secondary[300], fontSize: "26px" }} />
                    }
                />

                {/* ROW 2 */}
                <Box gridColumn="span 8" 
                    gridRow="span 3"
                    sx={{ 
                        "& .MuiDataGrid-root": { // sobrescrevendo o estilo das classes .MuiData... usando o & 
                            border: "none",
                            borderRadius: "5rem"
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none"
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderBottom: "none"
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: theme.palette.background.alt,
                        },
                        "& .MuiDataGrid-footerContainer": {
                            backgroundColor: theme.palette.background.alt,
                            color: theme.palette.secondary[100],
                            borderTop: "none"
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${theme.palette.secondary[200]} !important`
                        }
                    }}
                >
                    <DataGrid loading={isLoading || !data}
                        getRowId={(row) => row._id}
                        rows={(data && data.transactions) || [] }    
                        columns={columns}
                    />
                </Box>

                <Box gridColumn="span 4" 
                    gridRow="span 3"
                    backgroundColor={theme.palette.background.alt}
                    p="1.5rem"
                    borderRadius="0.55rem"
                >
                    <Typography variant="h6"
                        sx={{ color: theme.palette.secondary[100] }}
                    >
                        Vendas por categoria
                    </Typography>   
                    <BreakdownChart isDashboard={true} />
                    <Typography p="0 0.6" fontSize="0.8rem" 
                        sx={{ color: theme.palette.secondary[200] }}
                    >
                        Separação de estatísticas reais, informações via categoria por 
                        lucro feito este ano e total de vendas.
                    </Typography>
                </Box>

            </Box>

        </Box>
    );
}


export default Dashboard;
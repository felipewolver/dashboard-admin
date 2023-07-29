import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useGetCustomersQuery } from "../../state/api";
import Header from "../../components/Header";



const Customers = () => {

    const theme = useTheme();
    const { data, isLoading } = useGetCustomersQuery(); //console.log(data);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 0.5,
        },
        {
            field: "phoneNumber",
            headerName: "Phone Number",
            flex: 0.5,
            renderCell: (params) => {
                return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3"); // expressão regular para mascara de celular
            }
        },
        {
            field: "country",
            headerName: "Country",
            flex: 0.4,
        },
        {
            field: "occupation",
            headerName: "Occupation",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        },
    ]


    return (
        
        <Box m="1.5rem 2.5rem">  
            <Header title="CUSTOMERS" subtitle="Lista de Clientes" />
            <Box  mt="40px" height="75vh"
                sx={{ 
                    "& .MuiDataGrid-root": { // sobrescrevendo o estilo das classes .MuiData... usando o & 
                        border: "none"
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
                        backgroundColor: theme.palette.primary.light,
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
                    rows={data || []}
                    getRowId={(row) => row._id}
                    columns={columns}
                > 

                </DataGrid>
                
            </Box>

        </Box>
    );
}


export default Customers;
import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { useGetCustomersQuery } from "../../state/api";
import Header from "../../components/Header";



const Customers = () => {

    const theme = useTheme();
    const { data, isLoading } = useGetCustomersQuery();
    //console.log(data);


    return (
        
        <Box m="1.5rem 2.5rem">  
            <Header title="CUSTOMERS" subtitle="Lista de Clientes" />
            <Box>
                
                
            </Box>

        </Box>
    );
}


export default Customers;
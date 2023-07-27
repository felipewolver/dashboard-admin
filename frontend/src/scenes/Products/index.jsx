import { useState } from "react";
import { Box,
    Card,
    CardActions,
    CardContent,
    Collapse,
    Button,
    Typography,
    Rating,
    useTheme,
    useMediaQuery
} from "@mui/material";
import Header from "../../components/Header";
import { useGetProductQuery } from "../../state/api";



const Products = () => {

    const isNonMobile = useMediaQuery("(min-width: 1000px)");
    const {data, isLoading} = useGetProductQuery(); 
    // console.log("Products: ", data); 
    

    return (
        <Box m="1.5rem 2.5rem">
            
            <Header title="PRODUTOS" subtitle="Veja sua lista de produtos." />
            {data || !isLoading ? (
                <Box mt="20px"
                    display="grid"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))" 
                    justifyContent="space-between"
                    rowGap="20px"
                    columnGap="1.33%"
                    sx={{ "& > div": {gridColumn: isNonMobile ? undefined : "span 4"} }} // gridColumn vai receber undefined quando não for responsivo.
                                    
                    >

                </Box>
                
            ) : ( 

                <>Loading...</>     
            )}

        </Box>
    );
}


export default Products;
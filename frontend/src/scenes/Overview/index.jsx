import { useState } from "react";
import { Box, FormControl, MenuItem, InputLabel, Select } from "@mui/material";

import OverviewChart from "../../components/OverviewChart"; 
import Header from "../../components/Header";



const Overview = () => {
    
    const [view, setView] = useState('sales');

    return (
        
        <Box m="1.5rem 2.5rem">
            <Header title="OVERVIEW" subtitle="Visão geral de todas as receitas e lucros." />
            
            <Box height="75vh">
                <FormControl sx={{ mt: "1rem" }} >
                    <InputLabel> View </InputLabel>
                    <Select value={view}
                        label="View" 
                        onChange={(e) => setView(e.target.value)}
                        >
                        <MenuItem value="sales" > Vendas </MenuItem>
                        <MenuItem value="units" > Unidades </MenuItem>
                    </Select>

                </FormControl>
                <OverviewChart view={view} />

            </Box>

        </Box>
    );
}


export default Overview;
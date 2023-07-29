import { useState } from "react";
import { useGetTransactionsQuery } from "../../state/api";

import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "../../components/Header";




const Transactions = () => {

    const theme = useTheme();
    
    //informações que serão enviadas ao backend
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(20);
    const [sort, setSort] = useState({});
    const [search, setSearch] = useState("");

    const {data, loading} = useGetTransactionsQuery({ 
        page,
        pageSize,
        sort: JSON.stringify(sort),
        search
    });
    console.log("Transactions: ", data);


    return (
        
        <Box>
            Transações
        </Box>
    );
}


export default Transactions;
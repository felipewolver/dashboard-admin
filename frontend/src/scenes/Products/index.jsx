/* eslint-disable react/prop-types */
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


/* Componente Product q vai ser usado no componente Products em uma função
   anônima em data.map() onde vai mapear os dados porq data recebe a função
   useGetProductQuery que possui os dados q vem da função getProduct da api
   do backend e exibir nas props do mesmo nome no componente Product.  */
const Product = ({ 
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
}) => {
    const theme = useTheme();
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <Card sx={{
            backgroundImage: "none",
            backgroundColor: theme.palette.background.alt,
            borderRadius: "0.55rem"
        }}
        >
            <CardContent>
                <Typography  sx={{ fontSize: "14px" }} color={theme.palette.secondary[700]} gutterBottom >
                    {category}
                </Typography>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{ mb: "1.5rem" }}  color={theme.palette.secondary[400]}>
                    ${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />

                <Typography component="div" > {description} </Typography>

            </CardContent>
            <CardActions>
                <Button variant="primary" 
                    size="small"
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    Veja mais
                </Button>

            </CardActions>
            <Collapse in={isExpanded}
                timeout="auto"
                unmountOnExit
                sx={{ color: theme.palette.neutral[300] }}
            >
                <CardContent>
                    <Typography > id: {_id} </Typography>
                    <Typography > Fornecedor: {supply} </Typography>
                    <Typography > Vendas neste ano: {stat[0].yearlySalesTotal} </Typography> {/* Eh necessário colocar stat[0] pois stat eh um array de objetos */}
                    <Typography > Unidades vendidas neste ano: {stat[0].yearlyTotalSoldUnits} </Typography>
                </CardContent>
            </Collapse>

        </Card>
    );


}


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
                    {data.map(({
                       _id,
                       name,
                       description,
                       price,
                       rating,
                       category,
                       supply,
                       stat
                       
                    }) => ( // Aqui a função anônima para o component <Product recebe as mesmas props e exibe na tela
                        <Product key={_id} 
                            _id={_id}
                            name={name}
                            description={description}
                            price={price}
                            rating={rating}
                            category={category}
                            supply={supply}
                            stat={stat}
                        /> 
                        ) // fechamento da renderização do component Product
                    )}      {/* ) - fechamento do .map(). } - fechamento {data */}

                </Box>
                
            ) : ( 

                <>Carregando produtos...</>     
            )}

        </Box>
    );
}


export default Products;
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";


// Função que vai listar as estatiticas por produto
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const productWithStats = await Promise.all(
            products.map(async (product) => {
                const stats = await ProductStat.find({
                    productId: product._id 
                })
                
                return {
                    ...product._doc,
                    stats // Vai retornar o productStat com nome stats na lista de produtos
                }
            })
        );

        res.status(200).json(productWithStats);

    } catch (error) {
        console.log("Ocorreu um erro: ", error);

        res.status(404).json({message: error.message});
    }
}
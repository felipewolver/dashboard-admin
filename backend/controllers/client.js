import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat";


export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        const productWithStats = await Promise.all(
            products.map(async (product) => {
                const stat = await ProductStat.find({
                    productId: product._id 
                })
                
                return {
                    ...product._doc,
                    stat
                }
            })
        );

        res.status(200).json(products);

    } catch (error) {
        console.log("Ocorreu um erro: ", error);

        res.status(404).json({message: error.message});
    }
}
import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";


// Função que vai listar as estatiticas por produto
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
                    stat // Vai retornar o productStat com nome stat na lista de produtos
                }
            })
        );

        res.status(200).json(productWithStats);

    } catch (error) {
        console.log("Ocorreu um erro: ", error);

        res.status(404).json({message: error.message});
    }
}


export const getCustomers = async (req, res) => {
    try {
        const customers = await User.find({ role: 'user' })
            .select('-password');

        res.status(200).json(customers);

    } catch (error) {
        console.log("Ocorreu um erro: ", error);
    }
}
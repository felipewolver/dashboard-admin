import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

import getCountryIso3 from "country-iso-2-to-3";


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
        const customers = await User.find({ role: 'user' }) // vai encontrar todos os users com a responsabilidade(role) = 'user'
            .select('-password'); 

        res.status(200).json(customers);

    } catch (error) {
        console.log("Ocorreu um erro: ", error);
        
        res.status(404).json({ message: error.message });
    }
}


export const getTransactions = async (req, res) => {
    try {
        /* Vai ordenar(classificar) por ordem decrescente o campo userId
           Ex: {"field": "userId", "sort": "desc"} */
        const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;

        /* Função que vai deixar a ordenção formatada. Ex { userId -1 } 
        O -1 vai ordernar o sort de forma inversa, ou seja, em 'desc'. 1 = 'asc'
        Mais detalhes em: https://oieduardorabelo.medium.com/mongoose-como-find-funciona-f444115c1180*/
        const generateSort = () => {
            
            const sortParsed = JSON.parse(sort);
            const sortFormatted = {
                [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1 // vai ordenar em ordem alfabética(A-Z) senao (Z-A) 
            };

            return sortFormatted;
        }

        const sortFormatted = Boolean(sort) ? generateSort() : {};

        const transactions = await Transaction.find({
            $or: [
                { cost: {$regex: new RegExp(search, "i")} }, // i - ignora as letras maiusculas e minusculas sem fazer diferença na regular expression
                { userId: {$regex: new RegExp(search, "i")} },
            ]
        })
        .sort(sortFormatted)
        .skip(page * pageSize) // skip pula para próxima página
        .limit(pageSize); // a var. pageSize inicia com 20, aqui vai limitar 20 registros por página.

        const total = await Transaction.countDocuments({
            name: req._id // Fazendo assim name: { $regex: search, $options: "i" }, o total = 0, ou seja, não estah funcionando 
        });
        
        res.status(200).json({ transactions, total });
        
    } catch (error) {
        console.log("Ocorreu um erro: ", error);
        
        res.status(404).json({ message: error.message });
    }
}

/* Essa função vai exibir os usuários em um mapa geográfico no frontend
   Não foi implementado algum model para esta função somente o model User. */
export const getGeography = async (req, res) => {
    try {
        const users = await User.find();

        const mappedLocation = users.reduce((acc, {country}) => {
            const countryIso3 = getCountryIso3(country);

            if(!acc[countryIso3]) {
                acc[countryIso3] = 0;
            }
            
            acc[countryIso3] ++;
            return acc;

        }, {});

        const formattedLocation = Object.entries(mappedLocation).map(([country, count]) => {
            return { id: country, value: count }
        });

        res.status(200).json(formattedLocation);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

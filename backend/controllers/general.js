import User from "../models/User.js"; // acrescentar .js no final para funcionar corretamente a importação;


// Função para busca o usuário pelo id
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        res.status(200).json(user);

    } catch (error) {
        console.log("Ocorreu um erro: ", error);

        res.status(404).json({message: error.message});
    }
};


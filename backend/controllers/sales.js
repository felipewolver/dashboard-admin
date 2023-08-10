import OverallStat from "../models/overallStat.js";


// Função q vai exibir as estatísticas gerais de vendas
export const getSales = async (req, res) => {
    try {
        const overallStat = await OverallStat.find();

        res.status(200).json(overallStat[0]);

    } catch (error) {
        console.log("Ocorreu um erro:", error);
        res.status(404).json({ message: error.message });
    }
}

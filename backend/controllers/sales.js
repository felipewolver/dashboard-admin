import OverallStat from "../models/OverallStat.js";


// Função q vai exibir as estatísticas gerais de vendas
export const getSales = async (req, res) => {
    try {
        const overallStats = await OverallStat.find();

        res.status(200).json(overallStats[0]);

    } catch (error) {
        console.log("Ocorreu um erro:", error);
        res.status(404).json({ message: error.message });
    }
}

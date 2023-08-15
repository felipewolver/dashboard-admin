import User from "../models/User.js"; // acrescentar .js no final para funcionar corretamente a importação;

import OverallStat from "../models/OverallStat.js";
import Transaction from "../models/Transaction.js";

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


export const getDashboardStats = async (req, res) => {
    try {
        
        // Valores codificados
        const currentMonth = "November";
        const currentYear  = "2021";
        const currentDay   = "2021-11-15";

        // Transações atuais
        const transactions = await Transaction.find().limit(50)
            .sort({ createdOn: -1 });

        //Overall Stats
        const overallStat = await OverallStat.find({ year: currentYear }); 

        const { 
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        } = overallStat[0];

        const thisMonthStats = await overallStat[0].monthlyData.find(({ month }) => {
            return month === currentMonth
        });

        const todayStats = await overallStat[0].dailyData.find(({ date }) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions
        }); 

    } catch (error) {
        console.log("Ocorreu um erro: ", error);

        res.status(404).json({message: error.message});
    }
} 




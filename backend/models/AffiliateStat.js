import mongoose from "mongoose";


//estatística de afiliado
const affiliateStatSchema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
        type: [mongoose.Types.ObjectId],
        ref: "Transaction"
    }
  
}, { timestamps: true }
);


const AffiliateStat = mongoose.model('AffiliateStat', affiliateStatSchema);

export default AffiliateStat;
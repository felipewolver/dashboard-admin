import express from "express";
import { getSales } from "../controllers/sales.js";


const router = express.Router();

router.get('/sales', getSales); // vai ser uma requisição http de mesmo nome url localhost:3333/sales/sales 

export default router;
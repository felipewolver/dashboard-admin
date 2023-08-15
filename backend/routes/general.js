import express from "express";
import { getUser, getDashboardStats } from "../controllers/general.js";


// Rotas /general onde será utilizados as requisiçoes http GET,POST...
const router = express.Router();

// Na url vai ficar localhost:3333/general/user/:id
router.get('/user/:id', getUser);
router.get('/dashboard', getDashboardStats);

export default router;
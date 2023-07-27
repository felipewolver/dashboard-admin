import express from "express";
import { getUser } from "../controllers/general.js";


// Rotas /general 
const router = express.Router();

// Na url vai ficar localhost:3333/general/user/:id
router.get('/user/:id', getUser);

export default router;
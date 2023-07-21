import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from 'morgan';

import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";

// Configurações
dotenv.config();

const app = express();
app.use(express.json());

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

app.use(morgan('common'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());

// Rotas
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

//Mongoose configurações
const PORT = process.env.PORT || 9000;
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {

    app.listen(PORT, () => console.log("Servidor Online!! Port: "+ PORT))
})
.catch((err) => console.log("Ocorreu um erro: ", err));

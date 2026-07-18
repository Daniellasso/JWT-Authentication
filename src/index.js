require("dotenv").config();

const express = require("express");
const { Sequelize } = require("sequelize");

const config = require("./config/database");
const routes = require("./routes");


const server = express();

const PORT = 3333;


server.use(express.json());

server.use(routes);


const sequelize = new Sequelize(config);


async function startServer() {

    try {

        await sequelize.authenticate();

        console.log("Banco de Dados Conectado");


        server.listen(PORT, () => {

            console.log("Servidor Rodando!!!");
            console.log(`http://localhost:${PORT}`);

        });


    } catch (err) {
        console.error("Erro ao conectar ao banco de dados:",err);

    }

}


startServer();
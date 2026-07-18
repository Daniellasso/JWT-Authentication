const { Router } = require("express");

const AuthController = require("./controllers/AuthController");

const { deleteUser, getUsers, putUser } = require("./controllers/UsersControllers");

const AuthMiddleware = require("./middlewares/AuthMiddleware");

const routes = Router();



// Rotas públicas
routes.post("/register", AuthController.register);

routes.post("/login", AuthController.login);


// Rotas protegidas
routes.get("/users", AuthMiddleware, getUsers);

routes.put("/users/:id", AuthMiddleware, putUser);

routes.delete("/users/:id", AuthMiddleware, deleteUser);


module.exports = routes;
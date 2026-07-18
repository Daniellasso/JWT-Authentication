const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../models");

const { User } = db;


class AuthController {


    async register(req, res) {

        const {
            name,
            email,
            password
        } = req.body;


        const userExists = await User.findOne({

            where: {
                email
            }

        });


        if (userExists) {

            return res.status(400).json({

                message: "Usuário já cadastrado"

            });

        }


        const passwordHash = await bcrypt.hash(

            password,

            10

        );


        const user = await User.create({

            name,

            email,

            password: passwordHash

        });


        return res.status(201).json({

            id: user.id,

            name: user.name,

            email: user.email

        });


    }



    async login(req, res) {

        const {
            email,
            password
        } = req.body;



        const user = await User.findOne({

            where: {
                email
            }

        });



        if (!user) {

            return res.status(401).json({

                message: "Email ou senha inválidos"

            });

        }



        const passwordValid = await bcrypt.compare(

            password,

            user.password

        );



        if (!passwordValid) {

            return res.status(401).json({

                message: "Email ou senha inválidos"

            });

        }



        const token = jwt.sign(

            {
                id: user.id,
                email: user.email
            },

            process.env.JWT_SECRET,

            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }

        );



        return res.json({

            user: {

                id: user.id,

                name: user.name,

                email: user.email

            },

            token

        });


    }


}


module.exports = new AuthController();
const db = require("../models");
const bcrypt = require("bcryptjs");

const { User } = db;



const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (err) {
        console.log("Error", err);
        console.error(err);
    }
}

const putUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const passwordHash = await bcrypt.hash(password, 10);

        const user = await User.findByPk(req.params.id)

        if (user) {
            await user.update({ name, email, password: passwordHash })
            return res.status(200).json({ message: "Usuário atualizado com sucesso!" })
        } else {
            return res.status(404).json({ message: "Usuário não encontrado" })
        }

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            message: "Erro ao atualizar usuário."
        });
    }
}

const deleteUser = async (req, res) => {
    try {
        const users = await User.destroy({
            where: { id: req.params.id }
        })

        if (users === 0) {
            return res.status(404).json({
                message: "Usuário não encontrado."
            });
        }

        return res.status(200).json({
            message: "Usuário deletado com sucesso."
        });

    } catch (err) {
        console.log("Error: ", err);
        console.error(err);
    }
}

module.exports = { getUsers, putUser, deleteUser };
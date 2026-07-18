const jwt = require("jsonwebtoken");

const AuthMiddleware = (req, res, next) => {
    const authHeader =  req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            message: "Token não informado"
        })
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        )

        req.user = decoded;
    } catch (err) {
        console.error(err);
        console.log("Error:", err);
        return res.status(401).json({
            message: "Token inválido"
        })
    }

    next();

}

module.exports = AuthMiddleware;
module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    username: 'postgres',
    password: 'postgres',
    database: 'jwt_authentication',

    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
module.exports = function (Sequelize, sequelize) {
    return sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        fullname: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        role: {
            type: Sequelize.ENUM('professor', 'student'),
            allowNull: false,
        },
        user_is_verified: {
            type: Sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: false,
        },
    })
}

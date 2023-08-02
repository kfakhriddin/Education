module.exports = function (Sequelize, sequelize) {
    return sequelize.define("booking", {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,

    }
    })
}
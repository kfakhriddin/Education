module.exports = function (Sequelize, sequelize) {
    return sequelize.define("lectures", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },

        startTime: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: /^\d{4}-\d{2}-\d{2}-\d{2}:\d{2}$/ // To'g'ri vaqt formatini tekshirish
            }
        },
        endTime: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                is: /^\d{4}-\d{2}-\d{2}-\d{2}:\d{2}$/ // To'g'ri vaqt formatini tekshirish
            }
        },
    })

}
module.exports = async (db
) => {
    await db.booking.belongsTo(db.users, { foreignKey: 'userId' });
    await db.booking.belongsTo(db.lectures, { foreignKey: 'userId' });
    await db.users.hasMany(db.lectures),
    await db.lectures.belongsTo(db.users),

    await db.users.belongsToMany(db.lectures,{
        through: db.booking
    })
    await db.lectures.belongsToMany(db.users, { through: db.booking,  foreignKey: 'lectureId' });


    }







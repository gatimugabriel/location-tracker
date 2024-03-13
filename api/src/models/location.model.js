export default (sequelize, Sequelize) => {
    const Location = sequelize.define("locations", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        timestamp: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        latitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        longitude: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
    }, {
        freezeTableName: true,
        timestamps: true,
    })

    return {Location}
}

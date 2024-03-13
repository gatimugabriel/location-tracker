import { Sequelize } from 'sequelize'
import { dbConfig } from '../config/index.js'
import userModel from './user.model.js'
import locationModel from "./location.model.js";

let sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        dialect: dbConfig.dialect,
        host: dbConfig.HOST,
        pool: dbConfig.pool,
        operatorsAliases: 0,
        ssl: true
    }
)

const db = {}

// adding sequelize to db object
db.Sequelize = Sequelize
db.sequelize = sequelize

// -- models -- //
const { User } = userModel(sequelize, Sequelize)
const { Location } = locationModel(sequelize, Sequelize)

// models associations
// User to Location
User.hasMany(Location, { foreignKey: 'user_id', as: 'locations' })
Location.belongsTo(User, { foreignKey: 'user_id', as: 'user' })

// adding models to db object
Object.assign(db, { User, Location })

export default db

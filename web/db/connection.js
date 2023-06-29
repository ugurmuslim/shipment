import { Sequelize } from 'sequelize';
import config  from './config.js';

const env = process.env.NODE_ENV || 'development';
const sequelizeInit = new Sequelize(config[env]);

export const sequelize = sequelizeInit;

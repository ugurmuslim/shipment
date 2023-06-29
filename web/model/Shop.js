import { DataTypes } from 'sequelize';
import {sequelize} from '../db/connection.js';

export const Shop = sequelize.define('shopify_session', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  shop: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isOnline: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expires: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  scope: {
    type: DataTypes.STRING(1024),
    allowNull: true,
  },
  accessToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  onlineAccessInfo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  authKey: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});


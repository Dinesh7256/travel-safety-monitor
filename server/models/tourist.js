import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

const Tourist = sequelize.define('Tourist', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  document_hash: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'tourists',
  timestamps: true,
});

export default Tourist;

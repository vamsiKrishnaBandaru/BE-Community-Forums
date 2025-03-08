const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Forum = sequelize.define('Forum', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
});

// Establish relationship with User
Forum.belongsTo(User, {
  foreignKey: 'userId',
  as: 'creator'
});

module.exports = Forum; 
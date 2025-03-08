const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Forum = require('./Forum');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

// Establish relationships
Comment.belongsTo(User, {
  foreignKey: 'userId',
  as: 'author'
});

Comment.belongsTo(Forum, {
  foreignKey: 'forumId',
  as: 'forum'
});

module.exports = Comment; 
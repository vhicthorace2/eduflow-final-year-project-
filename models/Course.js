const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Course Model
 * Represents courses created by instructors
 */
const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Course title is required' }
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Course description is required' }
    }
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  instructorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'General'
  },
  difficulty: {
    type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
    defaultValue: 'beginner'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  enrollmentLimit: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
}, {
  timestamps: true,
  indexes: [
    { fields: ['instructorId', 'isActive'] }
  ]
});

module.exports = Course;

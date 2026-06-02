const { Sequelize } = require('sequelize');

/**
 * Database connection configuration
 * Connects to MySQL using Sequelize
 */
const sequelize = new Sequelize(
  process.env.DB_NAME || 'education_platform',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

/**
 * Test database connection
 */
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`MySQL Connected: ${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);
    
    // Sync models (create tables if they don't exist)
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('Database synchronized');
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Handle connection events
sequelize.on('error', (err) => {
  console.error(`MySQL connection error: ${err}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await sequelize.close();
  console.log('MySQL connection closed through app termination');
  process.exit(0);
});

module.exports = { sequelize, connectDB };

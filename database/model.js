const Sequelize = require('sequelize');

let sequelize = new Sequelize(
  '',
  'photos',
  'photos',
  {
    host: 'database',
    dialect: 'mysql',
  },
);

sequelize.query('CREATE DATABASE if not exists photoGallery;');

sequelize = new Sequelize(
  'photoGallery',
  'photos',
  'photos',
  {
    host: 'database',
    dialect: 'mysql',
  },
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully');
  })
  .catch((err) => {
    console.error('Unable to connect to the database: ', err);
  });

const Property = sequelize.define('property', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  beds: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  baths: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

const Image = sequelize.define('image', {
  propId: {
    type: Sequelize.INTEGER,
    foreignKey: true,
    allowNull: false,
  },
  imageUrl: {
    type: Sequelize.STRING(1234),
    allowNull: false,
  },
});

module.exports = {
  Property,
  Image,
};

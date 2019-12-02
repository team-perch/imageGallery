const Sequelize = require('sequelize');
const faker = require('faker');
const credentials = require('./../authentication.js');

const sequelize = new Sequelize(
  'photoGallery',
  'root',
  credentials.dbpw,
  {
    host: 'localhost',
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

const seedProperties = () => {
  for (let i = 0; i < 100; i += 1) {
    const address = faker.address.streetAddress();
    const beds = Math.ceil(Math.random() * 5);
    const baths = Math.ceil(beds / 2);
    Property.sync({}).then(() => Property.create({
      address,
      beds,
      baths,
    }));
  }
};

const seedImages = () => {
  for (let i = 1; i < 101; i += 1) {
    const imageUrl = 'aslfjaljfhdjfhksdfhio.jpg';
    const numPhotos = Math.floor(Math.random() * (35 - 20)) + 20;
    const propId = i;
    for (let h = 0; h < numPhotos; h += 1) {
      Image.sync({}).then(() => Image.create({
        propId,
        imageUrl,
      }));
    }
  }
};

seedProperties();
seedImages();

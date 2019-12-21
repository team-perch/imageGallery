/* eslint-disable no-await-in-loop */
const faker = require('faker');
const axios = require('axios');
const convert = require('xml-js');
const usePostgres = require('./postgresDB.js');


const primaryRecords = 50000;


const getKeys = async (room) => {
  const response = await axios.get(`http://perch-images.s3.amazonaws.com/?prefix=${room}/&delimiter=/`);

  const key = [];
  const options = { ignoreComment: true, alwaysChildren: true };

  const nodes = convert.xml2js(response.data, options).elements[0].elements;

  for (let i = 7; i < nodes.length; i += 1) {
    key.push(nodes[i].elements[0].elements[0].text);
  }

  return key;
};

const keys = {
  Bathroom: getKeys('Bathroom'),
  Bedroom: getKeys('Bedroom'),
  Exterior: getKeys('Exterior'),
  Kitchen: getKeys('Kitchen'),
  LivingRoom: getKeys('LivingRoom'),
  Misc: getKeys('Misc'),
  Porch: getKeys('Porch'),
  Window: getKeys('Windows'),
  Yard: getKeys('Yard'),
};


const createOwner = () => {
  const owner = {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    phone: faker.phone.phoneNumberFormat(),
  };

  return owner;
};

const createProperty = () => {
  const property = {
    address: faker.address.streetAddress('###'),
    active: faker.random.boolean(),
    listingPrice: faker.random.number({ min: 1, max: 100000 }) * 1000,
    sqft: faker.random.number({ min: 200, max: 100000 }),
    beds: faker.random.number({ min: 0, max: 10 }),
    baths: faker.random.number({ min: 1, max: 10 }),
    listingDate: faker.date.past(3).toISOString().split('T')[0],
  };

  return property;
};

const chooseImage = async (room) => {
  const roomKeys = await keys.Bathroom;
  const fileIndex = Math.floor(Math.random() * roomKeys.length);

  const image = {
    imageUrl: `https://perch-images.s3-us-west-1.amazonaws.com/${roomKeys[fileIndex]}`,
    roomTag: room,
    description: faker.lorem.sentence(10),
    views: faker.random.number({ min: 0, max: 999999 }),
    dimensions: `${faker.random.number({ min: 200, max: 3000 })}x${faker.random.number({ min: 200, max: 3000 })}`,
    fileFormat: roomKeys[fileIndex].split('.')[1],
  };

  return image;
};


const seedPostgres = async () => {
  const start = Date.now();

  let count = 0;
  for (let i = 1; count <= primaryRecords; i += 1) {
    const owner = createOwner();
    const ownerColumns = [];
    const ownerValues = [];

    Object.keys(owner).forEach((key) => {
      ownerColumns.push(`"${key}"`);
      ownerValues.push(`$$${owner[key]}$$`);
    });

    await usePostgres.query(`INSERT INTO "Owner"(${ownerColumns.join(',')}) VALUES(${ownerValues.join(',')});`);

    const homesOwned = Math.ceil(
      faker.random.number({ min: 1, max: 50 }) / faker.random.number({ min: 1, max: 50 }),
    );

    count += homesOwned;

    for (let j = 0; j < homesOwned; j += 1) {
      const property = createProperty();
      property.ownerId = i;
      const propertyColumns = [];
      const propertyValues = [];

      Object.keys(property).forEach((key) => {
        propertyColumns.push(`"${key}"`);
        propertyValues.push(`$$${property[key]}$$`);
      });

      await usePostgres.query(`INSERT INTO "Property"(${propertyColumns.join(',')}) VALUES(${propertyValues.join(',')});`);


      const imageColumns = new Set();
      const imagesEntries = [];

      for (let k = 0; k < faker.random.number({ min: 10, max: 20 }); k += 1) {
        const image = await chooseImage(faker.random.arrayElement([
          'Bathroom', 'Bedroom', 'Exterior', 'Kitchen', 'LivingRoom', 'Misc', 'Porch', 'Windows', 'Yard',
        ]));
        image.propId = i;
        image.createdAt = faker.date.between(
          property.listingDate,
          faker.date.recent(),
        ).toISOString();

        const imageValues = [];

        Object.keys(image).forEach((key) => {
          imageColumns.add(`"${key}"`);
          imageValues.push(`$$${image[key]}$$`);
        });

        imagesEntries.push(`(${imageValues.join(',')})`);
      }

      await usePostgres.query(`INSERT INTO "Image"(${Array.from(imageColumns).join(',')}) VALUES${imagesEntries.join(',')};`);
    }
  }

  console.log(Date.now() - start);
};

if (process.env.DB === 'Postgres') seedPostgres();

/* eslint-disable no-await-in-loop */
const faker = require('faker');
const axios = require('axios');
const convert = require('xml-js');
const path = require('path');
const fs = require('fs');
const cliProgress = require('cli-progress');
// const { MongoClient } = require('mongodb');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const usePostgres = require('./postgresDB.js');


const primaryRecords = 10000000;


const b1 = new cliProgress.SingleBar({
  format: 'Seeding Progress |' + '{bar}' + '| {percentage}%',
  barCompleteChar: '\u2588',
  barIncompleteChar: '\u2591',
  stopOnComplete: true,
});


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
  Windows: getKeys('Windows'),
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
    listingPrice: faker.random.number({ min: 1, max: 10000 }) * 1000,
    sqft: faker.random.number({ min: 200, max: 50000 }),
    beds: faker.random.number({ min: 0, max: 10 }),
    baths: faker.random.number({ min: 1, max: 10 }),
    listingDate: faker.date.past(3).toISOString().split('T')[0],
  };

  return property;
};

const chooseImage = async (room) => {
  const roomKeys = await keys[room];
  const fileIndex = Math.floor(Math.random() * roomKeys.length);

  const image = {
    imageUrl: `https://perch-images.s3-us-west-1.amazonaws.com/${roomKeys[fileIndex]}`,
    roomTag: room,
    description: faker.lorem.sentence(faker.random.number({ min: 3, max: 10 })),
    views: faker.random.number({ min: 0, max: 99999 }),
    dimensions: `${faker.random.number({ min: 200, max: 3000 })}x${faker.random.number({ min: 200, max: 3000 })}`,
    fileFormat: roomKeys[fileIndex].split('.')[1],
  };

  return image;
};


const ownerColumns = ['username', 'firstName', 'lastName', 'email', 'phone'];
const propertyColumns = ['ownerId', 'address', 'active', 'listingPrice', 'sqft', 'beds', 'baths', 'listingDate'];
const imageColumns = ['propId', 'imageUrl', 'roomTag', 'description', 'views', 'dimensions', 'createdAt', 'fileFormat'];


const seedPostgres = async () => {
  b1.start(100, 0);
  const start = Date.now();

  fs.writeFileSync(path.join(__dirname, './output/owner.csv'), ownerColumns.join(','));
  fs.writeFileSync(path.join(__dirname, './output/property.csv'), propertyColumns.join(','));
  fs.writeFileSync(path.join(__dirname, './output/image0.csv'), imageColumns.join(','));

  let primaryCount = 0;
  let progressCount = 0;
  let imageFile = 0;
  for (let i = 1; primaryCount <= primaryRecords; i += 1) {
    const owner = createOwner();
    const ownerValues = [];

    ownerColumns.forEach((column) => {
      ownerValues.push(owner[column]);
    });

    fs.appendFileSync(path.join(__dirname, './output/owner.csv'), `\n${ownerValues.join(',')}`);

    const homesOwned = Math.ceil(
      faker.random.number({ min: 1, max: 50 }) / faker.random.number({ min: 1, max: 50 }),
    );

    for (let j = 1; j <= homesOwned; j += 1) {
      const property = createProperty();
      property.ownerId = i;
      const propertyValues = [];

      propertyColumns.forEach((column) => {
        propertyValues.push(property[column]);
      });

      fs.appendFileSync(path.join(__dirname, './output/property.csv'), `\n${propertyValues.join(',')}`);

      const imagesEntries = [];
      const numberOfImages = faker.random.number({ min: 8, max: 12 });

      for (let k = 0; k < numberOfImages; k += 1) {
        const image = await chooseImage(faker.random.arrayElement([
          'Bathroom', 'Bedroom', 'Exterior', 'Kitchen', 'LivingRoom', 'Misc', 'Porch', 'Windows', 'Yard',
        ]));
        image.propId = primaryCount + j;
        image.createdAt = faker.date.between(
          property.listingDate,
          faker.date.recent(),
        ).toISOString();

        const imageValues = [];

        imageColumns.forEach((column) => {
          imageValues.push(image[column]);
        });

        imagesEntries.push(`${imageValues.join(',')}`);
      }

      fs.appendFileSync(path.join(__dirname, `./output/image${imageFile}.csv`), `\n${imagesEntries.join('\n')}`);
    }

    primaryCount += homesOwned;

    if (Math.floor(primaryCount / 100000) > progressCount) {
      // await exec(`psql -h 13.57.227.181 -d imagegallery -U student '\copy "Owner"("username","firstName","lastName","email","phone") FROM '${path.join(__dirname, './output/owner.csv')}' DELIMITER ',' CSV HEADER'`);

      // await exec(`psql -h 13.57.227.181 -d imagegallery -U student '\copy "Property"("ownerId","address","active","listingPrice","sqft","beds","baths","listingDate") FROM '${path.join(__dirname, './output/property.csv')}' DELIMITER ',' CSV HEADER'`);

      // await exec(`psql -h 13.57.227.181 -d imagegallery -U student '\copy "Image"("propId","imageUrl","roomTag","description","views","dimensions","createdAt","fileFormat") FROM '${path.join(__dirname, './output/image.csv')}' DELIMITER ',' CSV HEADER'`);

      // fs.writeFileSync(path.join(__dirname, './output/owner.csv'), ownerColumns.join(','));
      // fs.writeFileSync(path.join(__dirname, './output/property.csv'), propertyColumns.join(','));
      progressCount += 1;

      if (progressCount % 25 === 0) {
        imageFile = progressCount / 25;
        fs.writeFileSync(path.join(__dirname, `./output/image${imageFile}.csv`), imageColumns.join(','));
      }

      b1.increment();
    }
  }

  const seedTime = Date.now() - start;
  console.log('Completed seeding!', `${Math.floor(seedTime / 60000)}m ${Math.floor((seedTime / 1000) % 60)}s`);
};

if (process.env.DB === 'Postgres') seedPostgres();

// const seedMongo = async () => {
//   b1.start(100, 0);
//   const start = Date.now();

//   const client = await MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true });
//   const db = client.db('imageGallery');
//   let bulk = db.collection('property').initializeUnorderedBulkOp();

//   await db.collection('property').drop();
//   let count = 0;

//   for (let i = 1; i <= primaryRecords; i += 1) {
//     const property = createProperty();
//     property._id = i;
//     property.owner = createOwner();
//     property.images = [];

//     for (let j = 1; j <= faker.random.number({ min: 10, max: 20 }); j += 1) {
//       const image = await chooseImage(faker.random.arrayElement([
//         'Bathroom', 'Bedroom', 'Exterior', 'Kitchen', 'LivingRoom', 'Misc', 'Porch', 'Windows', 'Yard',
//       ]));
//       image.id = j;
//       image.createdAt = faker.date.between(property.listingDate, faker.date.recent());

//       property.images.push(image);
//     }

//     await bulk.insert(property);
//     count += 1;

//     if (count === 100000) {
//       count = 0;
//       await bulk.execute();
//       b1.increment();
//       bulk = db.collection('property').initializeUnorderedBulkOp();
//     }
//   }

//   const seedTime = Date.now() - start;
//   client.close();
//   b1.stop();
//   console.log('Completed seeding!', `${Math.floor(seedTime / 60000)}m ${Math.floor((seedTime / 1000) % 60)}s`);
// };

// if (process.env.DB === 'Mongo') seedMongo();

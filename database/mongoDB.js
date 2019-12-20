const { MongoClient } = require('mongodb');


const url = 'mongodb://localhost:27017';
const dbName = 'imageGallery';
let db;

MongoClient.connect(url, (err, client) => {
  db = client.db(dbName);
});

module.exports = db;


const Property = {
  id: INTEGER,
  owner: {
    username: STRING,
    firstName: STRING,
    lastName: STRING,
    email: STRING,
    phone: STRING,
  },
  address: STRING,
  active: BOOLEAN,
  listingPrice: INTEGER,
  sqft: INTEGER,
  beds: INTEGER,
  baths: INTEGER,
  listingDate: DATE,
  images: [
    {
      id: INTEGER,
      imageUrl: STRING,
      roomTag: STRING,
      description: STRING,
      views: INTEGER,
      dimensions: STRING,
      createdAt: DATETIME,
      fileFormat: STRING,
    },
  ],
};

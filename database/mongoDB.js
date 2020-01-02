const { MongoClient } = require('mongodb');


let db;

MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true })
  .then((client) => {
    db = client.db('imageGallery');
  });

module.exports = db;


// const Property = {
//   id: INTEGER,
//   owner: {
//     username: STRING,
//     firstName: STRING,
//     lastName: STRING,
//     email: STRING,
//     phone: STRING,
//   },
//   address: STRING,
//   active: BOOLEAN,
//   listingPrice: INTEGER,
//   sqft: INTEGER,
//   beds: INTEGER,
//   baths: INTEGER,
//   listingDate: DATE,
//   images: [
//     {
//       id: INTEGER,
//       imageUrl: STRING,
//       roomTag: STRING,
//       description: STRING,
//       views: INTEGER,
//       dimensions: STRING,
//       createdAt: DATETIME,
//       fileFormat: STRING,
//     },
//   ],
// };

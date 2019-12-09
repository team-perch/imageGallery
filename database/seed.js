/* eslint-disable no-console */
const faker = require('faker');
const axios = require('axios');
const convert = require('xml-js');
const { Property, Image } = require('./model.js');

const seedProperties = () => {
  for (let i = 0; i < 100; i += 1) {
    const address = faker.address.streetAddress();
    const beds = Math.ceil(Math.random() * 5);
    const baths = Math.ceil(beds / 2);
    Property.sync({ force: true }).then(() => Property.create({
      address,
      beds,
      baths,
    }));
  }
};

const seedImages = () => {
  axios.get('http://hrsf-fec-photogallery.s3.amazonaws.com')
    .then((response) => {
      const options = { ignoreComment: true, alwaysChildren: true };
      const nodes = convert.xml2js(response.data, options).elements[0].elements;
      const key = [];
      for (let i = 5; i < 126; i += 1) {
        key.push(nodes[i].elements[0].elements[0].text);
      }
      return key;
    })
    .then((key) => {
      for (let i = 1; i < 101; i += 1) {
        const numPhotos = Math.floor(Math.random() * (35 - 20)) + 20;
        const propId = i;
        for (let h = 0; h < numPhotos; h += 1) {
          const imageUrl = `https://hrsf-fec-photogallery.s3-us-west-1.amazonaws.com/${key[Math.floor(Math.random() * 120)]}`;
          Image.sync({ force: true }).then(() => Image.create({
            propId,
            imageUrl,
          }));
        }
      }
    })
    .catch((error) => console.log(error));
};

seedProperties();
seedImages();

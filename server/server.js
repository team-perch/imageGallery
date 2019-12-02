const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');
const { Property, Image } = require('./../database/seed.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/images', (req, res) => {
  const info = {};
  const propertyId = Math.floor(Math.random() * 100 + 1);
  // console.log(Property);
  // res.send(Property);

  Property.findOne({ where: { id: propertyId } })
    .then((property) => {
      info.property = property;
    })
    .then(() => Image.findAll({ where: { propId: propertyId } }))
    .then((images) => {
      info.images = images;
      res.send(info);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.use('/', express.static(path.join(__dirname, '../public')));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
const { Property, Image } = require('./../database/model.js');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/images/:propertyId', (req, res) => {
  const info = {};
  const { propertyId } = req.params;

  Property.findOne({
    attributes: ['id', 'address', 'baths', 'beds'],
    where: { id: propertyId },
  })
    .then((property) => {
      info.property = property;
    })
    .then(() => Image.findAll({
      attributes: ['propId', 'imageUrl'],
      where: { propId: propertyId },
    }))
    .then((images) => {
      info.images = images;
      res.send(info);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.use('/', express.static(path.join(__dirname, '../public')));

module.exports = app;

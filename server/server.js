const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
// eslint-disable-next-line no-unused-vars
const Sequelize = require('sequelize');
const { Property, Image } = require('./../database/model.js');

const app = express();

app.use(cors());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', express.static(path.join(__dirname, '../public')));

app.post('/api/images/:propertyId', (req, res) => {
  const { propertyId } = req.params;
  const { imageUrl, roomTag } = req.body;

  Image.upsert({
    propId: propertyId,
    imageUrl,
    roomTag,
  })
    .then((entry) => {
      res.status(200).send(entry);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

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

app.put('/api/images/:propertyId/:imageId', (req, res) => {
  const { imageId } = req.params;
  const newInfo = req.body

  Image.update(
    newInfo,
    { where: { id: imageId } },
  )
    .then((entry) => {
      res.status(200).send(entry);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete('/api/images/:propertyId/:imageId', (req, res) => {
  const { imageId } = req.params;

  Image.destroy({
    where: { id: imageId },
  })
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});


module.exports = app;

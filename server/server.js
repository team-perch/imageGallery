const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const Controller = require('./controller.js');


const app = express();

app.use(cors());
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', express.static(path.join(__dirname, '../public')));

app.post('/api/images/:propertyId', (req, res) => {
  const { propertyId } = req.params;

  Controller.insertImage(propertyId, req.body)
    .then((image) => {
      res.status(200).send(image);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/api/images/:propertyId', (req, res) => {
  const { propertyId } = req.params;

  Controller.findImages(propertyId)
    .then((images) => {
      res.status(200).send(images);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.put('/api/images/:propertyId/:imageId', (req, res) => {
  const { propertyId, imageId } = req.params;
  const newInfo = req.body

  Controller.update(propertyId, imageId, newInfo)
    .then((image) => {
      res.status(200).send(image);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.delete('/api/images/:propertyId/:imageId', (req, res) => {
  const { propertyId, imageId } = req.params;

  Controller.destroy(propertyId, imageId)
    .then(() => {
      res.status(200).send();
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});


module.exports = app;

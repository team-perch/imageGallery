const Model = require('./model.js');


module.exports = {
  insertImage: (propertyId, imageInfo) => (
    Model.insertImage(propertyId, imageInfo)
  ),

  findImages: (propertyId) => {
    const info = {};
    return Model.findProperty(propertyId)
      .then((property) => {
        info.property = property;
        return Model.findImages(propertyId);
      })
      .then((images) => {
        info.images = images;
        return info;
      })
      .catch((err) => err);
  },

  updateImage: (propertyId, imageId, newInfo) => (
    Model.updateImage(propertyId, imageId, newInfo)
  ),

  deleteImage: (propertyId, imageId) => (
    Model.deleteImage(propertyId, imageId)
  ),
};

const usePostgres = require('../database/postgresDB.js');
const useMongo = require('../database/mongoDB.js');
const useSequelize = require('../database/model.js');


const Properties = useMongo.collection('Properties');

module.exports = {
  insertImage: (propertyId, imageInfo) => {
    if (process.env.DB === 'Postgres') {
      const columns = [];
      const values = [];
      Object.keys(imageInfo).forEach((key) => {
        columns.push(`"${key}"`);
        values.push(`'${imageInfo[key]}'`);
      });

      return usePostgres.query(
        `INSERT INTO "Image"("propId", ${columns.join(',')})
        VALUES(${propertyId}, ${values.join(',')});`,
      );
    }

    if (process.env.DB === 'Mongo') {
      return Properties.update({

      });
    }

    const entry = imageInfo;
    entry.propId = propertyId;

    return useSequelize.Image.upsert(entry);
  },


  findProperty: (propertyId) => {
    if (process.env.DB === 'Postgres') {
      return usePostgres.query(`SELECT * FROM "Property" WHERE "id" = ${propertyId};`);
    }

    if (process.env.DB === 'Mongo') {
      return Properties.query();
    }

    return useSequelize.Property.findOne({
      attributes: ['id', 'address', 'baths', 'beds'],
      where: { id: propertyId },
    });
  },


  findImages: (propertyId) => {
    if (process.env.DB === 'Postgres') {
      return usePostgres.query(`SELECT * FROM "Image" WHERE "propId" = ${propertyId};`);
    }

    if (process.env.DB === 'Mongo') {
      return Properties.query();
    }

    return useSequelize.Image.findAll({
      attributes: ['propId', 'imageUrl'],
      where: { propId: propertyId },
    });
  },


  updateImage: (propertyId, imageId, newInfo) => {
    if (process.env.DB === 'Postgres') {
      const toSet = [];
      Object.keys(newInfo).forEach((key) => {
        toSet.push(`"${key}" = '${newInfo[key]}'`);
      });

      return usePostgres.query(`UPDATE "Image" SET ${toSet.join(',')} WHERE "id" = ${imageId};`);
    }

    if (process.env.DB === 'Mongo') {
      return Properties.query();
    }

    return useSequelize.Image.update(newInfo, { where: { id: imageId } });
  },


  deleteImage: (propertyId, imageId) => {
    if (process.env.DB === 'Postgres') {
      return usePostgres.query(`DELETE FROM "Image" WHERE "id" = ${imageId};`);
    }

    if (process.env.DB === 'Mongo') {
      return Properties.query();
    }

    return useSequelize.Image.destroy({ where: { id: imageId } });
  },
};

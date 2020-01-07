const usePostgres = require('../database/postgresDB.js');

module.exports = {
  insertImage: (propertyId, imageInfo) => {
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
  },


  findProperty: (propertyId) => (
    usePostgres.query(`SELECT * FROM "Property" WHERE "id" = ${propertyId};`)
  ),


  findImages: (propertyId) => (
    usePostgres.query(`SELECT * FROM "Image" WHERE "propId" = ${propertyId};`)
  ),


  updateImage: (propertyId, imageId, newInfo) => {
    const toSet = [];
    Object.keys(newInfo).forEach((key) => {
      toSet.push(`"${key}" = '${newInfo[key]}'`);
    });

    return usePostgres.query(`UPDATE "Image" SET ${toSet.join(',')} WHERE "id" = ${imageId};`);
  },


  deleteImage: (propertyId, imageId) => (
    usePostgres.query(`DELETE FROM "Image" WHERE "id" = ${imageId};`)
  ),
};

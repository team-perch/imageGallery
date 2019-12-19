DROP DATABASE IF EXISTS "imagegallery";

CREATE DATABASE "imagegallery";

\c "imagegallery";

CREATE TABLE "Owner" (
  "id" SERIAL Primary Key,
  "username" TEXT not null,
  "firstName" TEXT not null,
  "lastName" TEXT not null,
  "email" TEXT not null,
  "phone" TEXT not null
);

CREATE TABLE "Property" (
  "id" SERIAL Primary Key,
  "ownerId" INT references "Owner"(id) not null,
  "address" TEXT not null,
  "active" BOOLEAN not null,
  "listingPrice" INT not null,
  "sqft" INT not null,
  "beds" INT not null,
  "baths" INT not null,
  "listingDate" DATE not null
);

CREATE TABLE "Image" (
  "id" SERIAL Primary Key,
  "propId" INT references "Property"(id) not null,
  "imageUrl" TEXT not null,
  "roomTag" TEXT not null,
  "description" TEXT,
  "views" INT not null,
  "dimensions" TEXT not null,
  "createdAt" TIMESTAMP not null,
  "fileFormat" TEXT not null
);

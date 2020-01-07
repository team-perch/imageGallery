DROP DATABASE IF EXISTS "imagegallery";

CREATE DATABASE "imagegallery";

\c "imagegallery";

CREATE TABLE "Owner" (
  "id" SERIAL Primary Key,
  "username" VARCHAR(50) not null,
  "firstName" VARCHAR(50) not null,
  "lastName" VARCHAR(50) not null,
  "email" VARCHAR(50) not null,
  "phone" VARCHAR(20) not null
);

CREATE TABLE "Property" (
  "id" SERIAL Primary Key,
  "ownerId" INT references "Owner"(id) not null,
  "address" VARCHAR(255) not null,
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
  "imageUrl" VARCHAR(255) not null,
  "roomTag" VARCHAR(20) not null,
  "description" VARCHAR(255),
  "views" INT not null,
  "dimensions" VARCHAR(20) not null,
  "createdAt" TIMESTAMP not null,
  "fileFormat" VARCHAR(10) not null
);

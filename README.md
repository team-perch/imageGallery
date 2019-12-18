# Perch - Image Gallery

Image Gallery component of Perch, real estate listing app

## Related Projects

  - https://github.com/team-perch/costHomeOwnership
  - https://github.com/team-perch/cost-home-ownership
  - https://github.com/team-perch/graph
  - https://github.com/team-perch/Laurence-proxy

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

### API endpoints:

- POST /api/images/:propertyId

> Add an image to an existing property listing\
> Returns the new image entry object

- GET /api/images/:propertyId

> Get all images from an existing property listing\
> Returns an array of image objects matching the propertyId of the property listing

- PUT /api/images/:propertyId/:imageId

> Update a specified image from an existing property listing with new data\
> Returns the updated image entry object

- DELETE /api/images/:propertyId/:imageId

> Delete a specified image from an existing property listing


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```


/* eslint-disable no-console */
require('newrelic');
const app = require('./server');

const port = 3003;

app.listen(port, () => console.log(`Listening on port ${port}`));

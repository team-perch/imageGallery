/* eslint-disable no-console */
const app = require('./server');

const port = 3003;

app.listen(port, () => console.log(`Listening on port ${port}`));

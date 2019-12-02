const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// app.get('/', (req, res) => res.send('Hello From Server!'));

app.use('/', express.static(path.join(__dirname, '../public')));

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));

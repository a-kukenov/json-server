const express = require('express');
const path = require('path');
const morgan = require('morgan');
const fs = require('fs');

const server = express();
const PORT = 3000;

const createPath = (page) => path.resolve(__dirname, 'pages', `${page}`);

server.listen(PORT, (error) => {
  error ? console.log(error) : console.log(`listening port ${PORT}`);
});

server.use(express.static(__dirname + '/pages'));

server.get('/', (req, res) => {
  res.sendFile(createPath('main.html'));
});

server.get('/PRODUCTS', (req, res) => {
  res.sendFile(createPath('products.json'));
});

// Parse JSON request body
server.use(express.json());

server.post('/addData', (req, res) => {
  let data = fs.readFileSync(createPath('products.json'));
  data = JSON.parse(data);

  data.PRODUCTS.push(req.body);

  fs.writeFileSync(createPath('products.json'), JSON.stringify(data));

  res.send({ message: 'ok' });
});

server.get('/getData', (req, res) => {
  let data = fs.readFileSync(createPath('products.json'));
  data = JSON.parse(data);
  res.send(data);
});

server.use((req, res) => {
  res.status(404).sendFile(createPath('error.html'));
});
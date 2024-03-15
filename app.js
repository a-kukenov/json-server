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

if(fs.existsSync('pages/products.json') == false){
  const usersFill = (arr) => {
    let names = ['Алексей', 'Александр','Роман','Никита','Кирилл','Сергей','Анна','Ева','Милана','Лиза'];
    let countries = ['Беларусь','Польша','Китай','Италия','Россия','Испания','Франция','Швейцария','Украина'];
    let name = names[Math.floor(Math.random() * names.length)];
    let age  = Math.floor(Math.random() * (85 - 1 + 1)) + 1;
    let country = countries[Math.floor(Math.random() * names.length)];
    arr.push(`{
        "name": "${name}",
        "age": ${age},
        "country": "${country}",
        "id": ${arr.length}
    }`)
  }
  
    let jsonArr = [];
    for(let i = 0; i < 15; i++){
      usersFill(jsonArr)
    }
    fs.writeFile('pages/products.json', `{"PRODUCTS":[${jsonArr}]}`, () => {})
}

server.use(express.static(__dirname + '/pages'));

server.get('/', (req, res) => {
  res.sendFile(createPath('main.html'));
});
server.get('/list', (req, res) => {
  res.sendFile(createPath('list.html'));
});
server.get('/add', (req, res) => {
  res.sendFile(createPath('add.html'));
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
server.post('/patchData', (req, res) => {
  // let data = fs.readFileSync(createPath('products.json'));
  // data = JSON.parse(data);
  // console.log(req.id)
  // let currentElem = data.PRODUCTS.find((elem) => {
  //   return req.id == elem.id 
  // })
  // console.log(currentElem)
  let data = fs.readFileSync(createPath('products.json'));
  data = JSON.parse(data);

  let currentElem = data.PRODUCTS.find((elem) => {
    return req.body.id == elem.id;
  });

  // Update the existing element with the updated data
  if (currentElem) {
    Object.assign(currentElem, req.body);
    fs.writeFileSync(createPath('products.json'), JSON.stringify(data));
    res.send({ message: 'ok' });
  } else {
    res.send({ message: 'Element not found' });
  }
});

server.use((req, res) => {
  res.status(404).sendFile(createPath('error.html'));
});
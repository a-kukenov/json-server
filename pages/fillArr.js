const fs = require('fs');
const usersFill = (arr) => {
    let names = ['Алексей', 'Александр','Роман','Никита','Кирилл','Сергей','Анна','Ева','Милана','Лиза'];
    let countries = ['Беларусь','Польша','Китай','Италия','Россия','Испания','Франция','Швейцария','Украина'];
    let name = names[Math.floor(Math.random() * names.length)];
    let age  = Math.floor(Math.random() * (85 - 1 + 1)) + 1;
    let country = countries[Math.floor(Math.random() * names.length)];
    arr.push({
        "name": name,
        "age": age,
        "country": country,
        "id": arr.length
    })
  }
  
    let jsonArr = [];
    for(let i = 0; i < 15; i++){
      usersFill(jsonArr)
    }
    console.log(jsonArr)
    fs.writeFile('./products.json', `{"PRODUCTS":[${jsonArr}]}`, () => {})
const post = document.querySelector('.post');
const get = document.querySelector('.get');
const nameText = document.querySelector('.name');
const costText = document.querySelector('.cost');
const rightBox = document.querySelector('.rightBox');
let products;
const getData = url => {
    return new Promise((resolve, reject) =>
    fetch(url)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    )
  }
const postData = (url, product) => {
    return new Promise((resolve, reject) =>
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(product),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error))
     )
  }
post.addEventListener('click', async() => {
  try{
    // получим products из указаного url, если они существуют
    products = await getData('http://localhost:3000/PRODUCTS')
    products = products.PRODUCTS
  }
  catch(err){
    console.error(err)
  }
   //вызов функции:
  try {
    //тут мы по указаному url добавляем объект {name: "Иван", age: 35}
    await postData('http://localhost:3000/addData', {
        "name": nameText.value,
        "cost": costText.value,
        "id": products.length++
    })
      .then(response => {console.log(response, 'данные успешно добавлены')})
  } 
  catch (error) {
    console.error(error)
  }
})
get.addEventListener('click', async() => {
    try{
      // получим products из указаного url, если они существуют
      products = await getData('http://localhost:3000/PRODUCTS')
      products = products.PRODUCTS
      products.forEach((elem) => {
        rightBox.insertAdjacentHTML(`beforeend`, `
          <div class="slot">
            <div class="name">${elem.name}</div>
            <div class="cost">${elem.cost}</div>
          </div>
        `)
      });
    }
    catch(err){
      console.error(err)
    }
})

const post = document.querySelector('.post');
const get = document.querySelector('.get');
const nameText = document.querySelector('.name');
const costText = document.querySelector('.cost');
const box = document.querySelector('.box');

let products;
const getData = url => {
    return new Promise((resolve, reject) =>
    fetch(url)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error))
    )
  }
  const patchData = (url, productId, updatedData) => {
    return new Promise((resolve, reject) =>
      fetch(url, {
        method: 'POST',
        id: productId,
        body: JSON.stringify(updatedData),
        headers: { 'Content-type': 'application/json; charset=UTF-8' }
      })
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(error => reject(error))
    );
  }
get.addEventListener('click', async() => {
    try{
      // получим products из указаного url, если они существуют
      products = await getData('http://localhost:3000/PRODUCTS')
      products = products.PRODUCTS
      products.forEach((elem) => {
        box.insertAdjacentHTML(`beforeend`, `
          <div class="slot">
            <div class="name">${elem.name}</div>
            <div class="name">${elem.age}</div>
            <div class="name">${elem.country}</div>
            <div class="edit" id="${elem.id}">Edit</div>
          </div>
        `)
      });
    }
    catch(err){
      console.error(err)
    }
    const editButts = document.querySelectorAll('.edit');
    editButts.forEach((el) => {
      el.addEventListener('click', async() => {
        let newName = prompt('Введите новое имя')
        let newAge = prompt('Введите новый возраст')
        let newCountry = prompt('Введите новую страну')
        try {
          const updatedProductData = {name: newName,
          age: newAge,
          country: newCountry,
          id: el.id};
          console.log('start')
          await patchData('http://localhost:3000/patchData', el.id, updatedProductData)
            .then(response => console.log(response, 'данные успешно обновлены'));
            console.log('end')
        } catch (error) {
          console.error(error);
        }
      })
    })
})


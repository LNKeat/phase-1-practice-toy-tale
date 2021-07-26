let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  const form = document.querySelector('.add-toy-form');
  // const likeBtn = 
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
  getToys();
  form.addEventListener('submit', submitNewToy)
});

function submitNewToy(e){
  e.preventDefault();
  const inputName = document.getElementsByClassName('input-text')[0].value
  const inputImg = document.getElementsByClassName('input-text')[1].value
  let toyObj = {
    name: inputName,
    image: inputImg,
    likes: 0,
  }
  
  submitToy(toyObj);
  createToyCard(toyObj);
  document.querySelector('.add-toy-form').reset()
}

function createToyCard(toy){
  const newCard = document.createElement('div')
    newCard.classList = 'card'
  const header = document.createElement('h2')
    header.textContent = toy.name
  const img = document.createElement('img')
    img.className = 'toy-avatar'
    img.src = toy.image
  const likes = document.createElement('p')
    likes.textContent = `Likes: ${toy.likes}`
  const btn = document.createElement('button')
    btn.className = 'like-btn'
    btn.id = toy.id
    btn.textContent = 'Click to Like <3'
    btn.addEventListener('click', () => {
      toy.likes += 1
      likes.textContent = `Likes: ${toy.likes}`
      updateLikes(toy)
    } )
  document.querySelector('#toy-collection').appendChild(newCard)
  newCard.append(header, img, likes, btn)
}

//'GET' request to access the toys objects and create toy cards on DOM
function getToys() {
  fetch('http://localhost:3000/toys')
  .then(resp => resp.json())
  .then(toys => toys.forEach(toy => createToyCard(toy)))
}

//'POST' request to take info submitted on form and load it as an object into the "database"
function submitToy(toy){
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type" : "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toy)
  })
}

//'PATCH' request to update the "database" with the new number of likes
function updateLikes(toyObj){
  console.log(`toy id: ${toyObj.id}`)
  fetch(`http://localhost:3000/toys/${toyObj.id}`,{
    method: 'PATCH',
    headers:{
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      likes: toyObj.likes
    })
    // .then(resp => resp.json())
    // .then(data => console.log(data))
  })
}




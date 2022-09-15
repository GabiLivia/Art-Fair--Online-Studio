let data = {
  artCollection: [],
};
let databaseURL =
  "https://art-collection-4155a-default-rtdb.europe-west1.firebasedatabase.app/";

async function getData() {
  let url = databaseURL + ".json";
  const response = await fetch(url);
  let listFromDatabase = await response.json();
  data.artCollection = listFromDatabase;

  loadProducts();
}

function loadProducts() {
  let prod = "";
  for (let [i, product] of Object.entries(data.artCollection)) {
    if (product === null) {
      continue;
    }

    prod += `  
    <div class="card-products ${data.artCollection[i].category} ">
      <img class="img-card" src="${data.artCollection[i].image}" alt="art">
      <h5 class="card-title"><span class="highlight">${data.artCollection[i].title}</span></h5>
      <h6 class="category">${data.artCollection[i].category}</h6>
      <div class="info">
        <h5 class="card-artist">${data.artCollection[i].artist}</h5>
        <h3>$ ${data.artCollection[i].price}</h3>
      </div>
   
    </div>
   `;
  }

  document.getElementById("products").innerHTML = prod;
}

function filterProduct(value) {
  let buttons = document.querySelectorAll(".button-value");

  buttons.forEach((button) => {
    if (value == button.innerText) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });

  let cards = document.querySelectorAll(".card-products");

  cards.forEach((element) => {
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      if (element.classList.contains(value)) {
        element.classList.remove("hide");
      } else {
        element.classList.add("hide");
      }
    }
  });
}

document.getElementById("search").addEventListener("click", () => {
  let searchInput = document.getElementById("search-input").value;
  let artist = document.querySelectorAll(".card-artist");
  let cards = document.querySelectorAll(".card-products");
  console.log(artist);

  artist.forEach((element, index) => {
    if (element.innerText.includes(searchInput.trim().toUpperCase())) {
      cards[index].classList.remove("hide");
    } else {
      cards[index].classList.add("hide");
    }
  });
});

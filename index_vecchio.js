// import { fetchLibri } from "./fetch.js";
// import { createCards } from "./createCard.js";

// document.addEventListener("DOMContentLoaded", function () {
//     fetchLibri()
//         .then((data) => {
//             const row = document.querySelector(".row");
//             data.map((libri) => {
//                 const cardHTML = createCards(libri)
//                 row.innerHTML += cardHTML
//             });
//         })
//         .catch((err) => console.log(err));
// })
let libri = []

window.addEventListener('DOMContentLoaded', init);

function init() {
fetchLibri()
}



function fetchLibri() {fetch("https://striveschool-api.herokuapp.com/books")
    .then((res) => res.json())
    .then((data) => {
        libri = data
        const row = document.querySelector(".row");
        data.map((libri) => {
            const { title, img, price } = libri;
            row.innerHTML += `<div class="col mt-3">
                <div class="card">
                  <img src="${img}" class="card-img-top" alt="Copertina" />
                  <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${price}$</p>
                    <div class="d-flex gap-2">
                    <button class="btn btn-primary bottoniCarrello" onClick="aggiungiCarrello('${title}','${img}','${price}')">Aggiungi al carello</button>
                    <button class="btn btn-danger">Salta</button>
                    </div> 
                  </div>
                </div>
              </div>`;
        })
        window.aggiungiCarrello = aggiungiCarrello;
    })
    .catch((err) => console.log(err));
}

const aggiungiCarrello = function (title, img, price) {
  const carrello = document.querySelector(".carrello")
  carrello.innerHTML += `<div class="container d-flex justify-content-between mb-2">
  <img src="${img}" class="immagine" alt="copertina"/>
  <div class="titolo">${title}</div>
  <div class="prezzo">${price}$</div>
</div>`
}
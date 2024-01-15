import { getBooks, getBookById } from "./fetch.js";

let books = []
let cart = []

window.addEventListener('DOMContentLoaded', init);
async function init() {
    books = await getBooks();
    displayBooks(books)
}

const booksHtml = (book) => {
    const { asin, title, img, price } = book;
    const card = `
        <div id="${asin}" class="col mt-3">
            <div class="card">
                <span class="badge position-absolute top-0 start-100 translate-middle rounded-pill bg-danger d-none">
                <i class="bi bi-cart4"></i>
                </span>
                <img src="${img}" class="card-img-top" alt="Copertina" />
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${price}$</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary cartButton" data-asin="${asin}">Add to cart</button>
                        <button class="btn btn-danger skipButton">Skip</button>
                    </div>
                </div>
            </div>
        </div>`;
    return card
}

function eventHandler() {
    const cartButton = document.querySelectorAll(".cartButton")
    const skipButton = document.querySelectorAll(".skipButton")

    cartButton.forEach((element, index) => {
        element.addEventListener("click", () => {
            addToCart(books[index], index)
        })
    })

    skipButton.forEach((element, index) => {
        element.addEventListener("click", () => {
            skip(index)
        })
    })
}

const addToCart = (book, index) => {
    const exists = cart.some(element => element.asin === book.asin)
    let counter = 0
    if(exists) {
    console.log("esiste")
    } else {
    cart.push(book)
    const cartHtml = document.querySelector(".cart")
    cartHtml.innerHTML += `<div class="container d-flex justify-content-between align-items-center mb-2">
        <div class="itemsCount"></div>
        <img src="${book.img}" class="immagine" alt="copertina" />
        <div class="titolo">${book.title}</div>
        <div class="prezzo">${book.price}$</div>
        </div>`;
    }
    const badge = document.querySelectorAll(".badge")
    badge[index].classList.remove("d-none")
}

const skip = (index) => {
    const cards = document.querySelectorAll(".card")
    cards[index].parentElement.classList.add("d-none")
}

const searchBook = () => {
    const searchInput = document.getElementById("searchInput")
    searchInput.addEventListener("keyup", () => {
        const cards = document.querySelectorAll(".card")
        cards.forEach((card) => {
            const title = card.querySelector(".card-title").innerText.toLowerCase();
            if (searchInput.value.length >= 3) {
                if (title.includes(searchInput.value)) {
                    card.parentElement.style.display = "block"
                } else {
                    card.parentElement.style.display = "none"
                }
            } else {
                card.parentElement.style.display = "block"
            }
        })
    })
}


const displayBooks = (books) => {
    books.map((book) => {
        const row = document.querySelector(".row");
        row.innerHTML += booksHtml(book)
    });
    eventHandler()
    searchBook()
}

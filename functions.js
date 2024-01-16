import { getBooks } from "./fetch.js";

// empty array creation for cart
let cart = []

// card creation in which to place books
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
                    <div class="d-flex justify-content-between">
                        <button class="btn btn-primary cartButton" data-asin="${asin}">Add to cart</button>
                        <a class="btn btn-warning detailsButton" href="./details.html?id=${asin}">Details</a>
                        <button class="btn btn-secondary skipButton">Skip</button>
                    </div>
                </div>
            </div>
        </div>`;
    return card
}

// Function to add EventListener to "Add to cart", "Skip", and "Trash" buttons.
function eventHandler(books) {
    const cartButton = document.querySelectorAll(".cartButton")
    const skipButton = document.querySelectorAll(".skipButton")
    const trashButton = document.querySelector(".trashButton")

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

    trashButton.addEventListener("click", () => {
        deleteAll()
    })
}

// function to add books to cart
const addToCart = (book, index) => {
    const exists = cart.some(element => element.asin === book.asin)
    const badge = document.querySelectorAll(".badge")
    const cartHtml = document.querySelector(".cart")
    const totalBooks = document.querySelector(".totalBooks")
    const totalPrice = document.querySelector(".totalPrice")

    if (exists) {
        alert("This book is already in your cart!")
    } else {
        cart.push(book)
        totalBooks.innerHTML = (Number(totalBooks.innerHTML) +1)
        totalPrice.innerHTML = (Number(totalPrice.innerHTML) + Number(book.price)).toFixed(2)
        cartHtml.innerHTML += `<div class="container d-flex justify-content-between align-items-center mb-2">
        <div class="itemsCount"></div>
        <img src="${book.img}" class="img" alt="cover" />
        <div class="title">${book.title}</div>
        <div class="ms-2 fw-bold"><span class="price">${book.price}</span>$</div>
        <button type="button" class="removeButton btn btn-danger ms-2" data-asin="${book.asin}">
                <i class="bi bi-trash"></i>
              </button>
        </div>`;
        removeFromCart()
    }
    badge[index].classList.remove("d-none")
}

// function to hide books from the page
const skip = (index) => {
    const cards = document.querySelectorAll(".card")
    cards[index].parentElement.classList.add("d-none")
}

// Function to search for books after entering at least 3 characters
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

// Function to remove books from the cart individually
const removeFromCart = () => {
    const removeButton = document.querySelectorAll(".removeButton")
    removeButton.forEach((element) => {
        element.addEventListener("click", (ev) => {
            const cartBook = ev.target.parentElement.parentElement
            const totalBooks = document.querySelector(".totalBooks")
            const totalPrice = document.querySelector(".totalPrice")
            const asin = ev.target.parentElement.getAttribute("data-asin")
            const price = ev.target.closest("div").querySelector(".price").innerText
            const badge = document.getElementById(`${asin}`).querySelector(".badge")

            cartBook.classList.add("d-none")
            totalBooks.innerHTML = (Number(totalBooks.innerHTML) -1)
            totalPrice.innerHTML = (Number(totalPrice.innerHTML) - Number(price)).toFixed(2)
            badge.classList.add("d-none")
            
            const findBook = cart.find(() => `${asin}`)
            cart.splice(findBook, 1)
        })
    })
}

// function to reset the cart
const deleteAll = () => {
    const cartHtml = document.querySelector(".cart")
    const totalBooks = document.querySelector(".totalBooks")
    const badge = document.querySelectorAll(".badge")
    const totalPrice = document.querySelector(".totalPrice")

    cartHtml.innerHTML = ""
    totalBooks.innerHTML = 0
    cart = []
    totalPrice.innerHTML = 0
    badge.forEach((element) => {
        element.classList.add("d-none")
    })
}

// function to show books on page
const displayBooks = (books) => {
    books.map((book) => {
        const row = document.querySelector(".row");
        row.innerHTML += booksHtml(book)
    });
    eventHandler(books)
    searchBook()
}

export {getBooks, displayBooks}
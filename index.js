import { getBooks, getBookById } from "./fetch.js";

const books = await getBooks();

const booksHtml = (book) => {
    const { asin, title, img, price } = book;
    const card = `
        <div id="${asin}" class="col mt-3">
            <div class="card">
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger d-none">
                <i class="bi bi-cart4"></i>
                </span>
                <img src="${img}" class="card-img-top" alt="Copertina" />
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <p class="card-text">${price}$</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-primary cartButton" data-asin="${asin}">Add to cart</button>
                        <button class="btn btn-danger skip">Skip</button>
                    </div>
                </div>
            </div>
        </div>`;
    return card
}

const addToCart = (books) => {
    books.map((book) => {
        const card = document.getElementById(`${book.asin}`)
        const cartButton = card.querySelector(".cartButton")
        cartButton.addEventListener("click", async (ev) => {
            const id = ev.target.getAttribute("data-asin")
            const getBook = await getBookById(id)
            const cart = document.querySelector(".cart")
            const badge = card.querySelector(".badge")

            cart.innerHTML += `<div id="${getBook.asin}" class="container d-flex justify-content-between mb-2">
                <img src="${getBook.img}" class="immagine" alt="copertina"/>
                <div class="titolo">${getBook.title}</div>
                <div class="prezzo">${getBook.price}$</div>
                </div>`;

            badge.classList.toggle("d-none")
        })
    })
}

const skip = () => {
    const skipButtons = document.querySelectorAll(".skip")
    const cards = document.querySelectorAll(".card")
    skipButtons.forEach((skip, index) => {
        skip.addEventListener("click", (ev) => {
            if (ev.target === skip) {
                cards[index].parentElement.classList.add("d-none")
            }
        })
    })
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
    skip();
    addToCart(books);
    searchBook()
}
displayBooks(books)
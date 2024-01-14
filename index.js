window.addEventListener('DOMContentLoaded', init);
function init() {
    getBooks();
}

function getBooks() {
    fetch("https://striveschool-api.herokuapp.com/books")
        .then((res) => res.json())
        .then((data) => {
            displayBooks(data)
        })
        .catch((err) => console.log("Error:" + err));
};

function getBookById(asin) {
    fetch("https://striveschool-api.herokuapp.com/books/" + asin)
        .then((res) => res.json())
        .then((data) => {
            addToCart(data)
        })
        .catch((err) => console.log("Error:" + err));
};

const booksHtml = (book) => {
    const row = document.querySelector(".row");
    const { asin, title, img, price } = book;
    row.innerHTML += `
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
                        <button class="btn btn-primary cartButtons" data-asin="${asin}">Add to cart</button>
                        <button class="btn btn-danger skip">Skip</button>
                    </div>
                </div>
            </div>
        </div>`;
    addEvent(book)
    skip()
};



const displayBooks = (books) => {
    books.map((book) => {
        booksHtml(book)
    })
}

const addEvent = (book) => {
    const cartButtons = document.querySelectorAll(".cartButtons")
    cartButtons.forEach((button) => {
        button.addEventListener("click", (ev) => {
            const target = ev.target
            const asin = target.getAttribute("data-asin");
            getBookById(asin)
        })
    })
}

const addToCart = (book) => {
    const cart = document.querySelector(".cart")
    const card = document.getElementById(`${book.asin}`)
    const badge = card.querySelector(".badge")

    cart.innerHTML += `<div id="${book.asin}" class="container d-flex justify-content-between mb-2">
    <img src="${book.img}" class="immagine" alt="copertina"/>
    <div class="titolo">${book.title}</div>
    <div class="prezzo">${book.price}$</div>
    </div>`

    badge.classList.toggle("d-none")

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
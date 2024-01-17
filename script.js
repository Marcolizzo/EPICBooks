import { getBooks } from "./fetch.js";
import { eventHandler } from "./btnFunctions.js"
import { booksHtml } from "./booksHtml.js";

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

// function to show books on page
const displayBooks = (books) => {
    books.map((book) => {
        const row = document.querySelector(".row");
        row.innerHTML += booksHtml(book)
    });
    eventHandler(books)
    searchBook()
}

export { getBooks, displayBooks }
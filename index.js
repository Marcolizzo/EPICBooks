import { getBooks, displayBooks } from "./functions.js";

let books = []
window.addEventListener('DOMContentLoaded', init);
async function init() {
    books = await getBooks();
    displayBooks(books)
}
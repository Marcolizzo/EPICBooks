import { getBooks, displayBooks } from "./script.js";

let books = []
window.addEventListener('DOMContentLoaded', init);
async function init() {
    books = await getBooks();
    displayBooks(books)
}
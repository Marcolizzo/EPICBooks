import { getBookById } from "./fetch.js";
import { detailsBookHtml } from "./booksHtml.js";

let book = {}

window.addEventListener('DOMContentLoaded', init);
async function init() {
  const params = new URLSearchParams(location.search)
  const id = params.get("id")
  book = await getBookById(id)
  detailsBook(book)
}

const detailsBook = (book) => {
  const bookContainer = document.querySelector(".book.container")
  bookContainer.innerHTML = detailsBookHtml(book)
}
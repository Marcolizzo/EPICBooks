import { getBookById } from "./fetch.js";

let book = {}

window.addEventListener('DOMContentLoaded', init);
async function init() {
  const params = new URLSearchParams(location.search)
  const id = params.get("id")
  book = await getBookById(id)
  displayBook(book)
}

const displayBook = (book) => {
  const bookContainer = document.querySelector(".book.container")
  bookContainer.innerHTML = `
    <h1 class="my-5 title">${book.title}</h1>
      <div class="d-flex book">
        <img src="${book.img}" alt="cover" class="me-5 cover w-25"/>
        <div class="detail">
          <p>
            <span class="fw-bold">Description: </span><br>
            <span class="description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, error!
                Voluptatem nihil, labore voluptas fugit hic aut sed exercitationem
                eveniet voluptates dolor odio, nobis rerum, fuga officia consequatur
                itaque similique!
            </span>
          </p>
          <p class="fw-bold">Price: <span class="price fw-normal">${book.price}$</span></p>
          <p class="fw-bold">Category: <span class="category fw-normal">${book.category}</span></p>
        </div>
      </div>`
}
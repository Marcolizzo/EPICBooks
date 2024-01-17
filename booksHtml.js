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

const detailsBookHtml = (book) => {
    const bookHtml = `
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
    return bookHtml
}

export { booksHtml, detailsBookHtml }
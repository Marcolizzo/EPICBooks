// empty array creation for cart
let cart = []

const cartHtml = document.querySelector(".cart")
const totalBooks = document.querySelector(".totalBooks")
const totalPrice = document.querySelector(".totalPrice")

// function to add books to cart
const addToCart = (book, index) => {
    const exists = cart.some(element => element.asin === book.asin)
    const badge = document.querySelectorAll(".badge")
    if (exists) {
        alert("This book is already in your cart!")
    } else {
        cart.push(book)
        totalBooks.innerHTML = (Number(totalBooks.innerHTML) + 1)
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

// Function to remove books from the cart individually
const removeFromCart = () => {
    const removeButton = document.querySelectorAll(".removeButton")
    removeButton.forEach((element) => {
        element.addEventListener("click", (ev) => {
            const cartBook = ev.target.parentElement.parentElement
            const asin = ev.target.parentElement.getAttribute("data-asin")
            const price = ev.target.closest("div").querySelector(".price").innerText
            const badgeCart = document.getElementById(`${asin}`).querySelector(".badge")

            cartBook.classList.add("d-none")
            totalBooks.innerHTML = (Number(totalBooks.innerHTML) - 1)
            totalPrice.innerHTML = (Number(totalPrice.innerHTML) - Number(price)).toFixed(2)
            badgeCart.classList.add("d-none")

            const findBook = cart.find(() => `${asin}`)
            cart.splice(findBook, 1)
        })
    })
}

// function to reset the cart
const deleteAll = () => {
    const badge = document.querySelectorAll(".badge")

    cartHtml.innerHTML = ""
    totalBooks.innerHTML = 0
    cart = []
    totalPrice.innerHTML = 0
    badge.forEach((element) => {
        element.classList.add("d-none")
    })
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

export { addToCart, skip, removeFromCart, deleteAll, eventHandler }
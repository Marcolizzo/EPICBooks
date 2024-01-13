export function createCards(libri) {
    const { title, img, price } = libri;
    return `<div class="col mt-3">
    <div class="card">
      <img src="${img}" class="card-img-top" alt="Copertina" />
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">${price}$</p>
        <div class="d-flex gap-2">
        <a href="#" class="btn btn-primary">Aggiungi al carello</a>
        <a href="#" class="btn btn-danger">Salta</a>
        </div> 
      </div>
    </div>
  </div>`;
}
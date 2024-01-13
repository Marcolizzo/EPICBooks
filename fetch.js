export function fetchLibri() {
    const requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      return fetch("https://striveschool-api.herokuapp.com/books", requestOptions)
      .then((res) => res.json())
}
async function getBooks() {
    try {
        const res = await fetch("https://striveschool-api.herokuapp.com/books");
        const data = await res.json();
        return data;
    } catch (err) {
        console.error("Error:" + err);
        alert(err);
    }
};

export { getBooks }
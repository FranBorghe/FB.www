
const book = {
  titolo: "Succede sempre",
  autore: "Vittorio",
  annoPubblicazione: 1980,
  genere: "Romanzo ",
  numeroPagine: 167
};

for (let key in book) {

  console.log(`${key} -> ${book[key]}`);
}


const book = {
  titolo: "il nome della rosa",
  autore: "Umberto Eco",
  annoPubblicazione: 1980,
  genere: "Romanzo Storico",
  numeroPagine: 512
};

for (let key in book) {

  console.log(`${key} -> ${book[key]}`);
}

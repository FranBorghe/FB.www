const args = process.argv.slice(2);

if (args.length !== 3) {
    console.log("Uso: node node1.js <numero> <operazione> <numero>");
    console.log("Operazioni: + - * / ^");
    process.exit(1);
}

const a = parseFloat(args[0]);
const operazione = args[1];
const b = parseFloat(args[2]);

if (isNaN(a) || isNaN(b)) {
    console.log("Errore: inserisci valori numerici validi.");
    process.exit(1);
}

let risultato;

if (operazione === "+") {
    risultato = a + b;
} else if (operazione === "-") {
    risultato = a - b;
} else if (operazione === "*") {
    risultato = a * b;
} else if (operazione === "/") {
    if (b === 0) {
        console.log("Errore: divisione per zero non consentita.");
        process.exit(1);
    }
    risultato = a / b;
} else if (operazione === "^") {
    risultato = a ** b;
} else {
    console.log("Errore: operazione non riconosciuta. Usa + - * / ^");
    process.exit(1);
}

console.log(a + " " + operazione + " " + b + " = " + risultato);

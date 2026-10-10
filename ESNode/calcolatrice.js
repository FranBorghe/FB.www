#!/usr/bin/env node

/**
 * Esercizio c: Calcolatrice da linea di comando
 *
 * Programma che riceve due numeri e un'operazione come argomenti
 * e stampa il risultato nella console.
 *
 * Utilizzo:
 *   node calcolatrice.js <numero1> <operazione> <numero2>
 *
 * Esempi:
 *   node calcolatrice.js 5 add 3
 *   node calcolatrice.js 10 div 4
 *   node calcolatrice.js 2 pow 8
 */

// process.argv contiene gli argomenti da riga di comando
// [0] = percorso node
// [1] = percorso dello script
// [2+] = argomenti passati dall'utente

// Operazioni disponibili: per ognuna il simbolo da stampare e la funzione di calcolo
const operazioni = {
  add: { simbolo: '+', calcola: (a, b) => a + b },
  sub: { simbolo: '-', calcola: (a, b) => a - b },
  mul: { simbolo: '*', calcola: (a, b) => a * b },
  div: { simbolo: '/', calcola: (a, b) => a / b },
  mod: { simbolo: '%', calcola: (a, b) => a % b },
  pow: { simbolo: '^', calcola: (a, b) => a ** b }
};

// Simboli accettati al posto del nome dell'operazione
// Nota: su Linux l'asterisco va scritto tra apici ('*') oppure si usa la x,
// altrimenti la shell lo sostituisce con l'elenco dei file della cartella
const simboli = {
  '+': 'add',
  '-': 'sub',
  '*': 'mul',
  'x': 'mul',
  '/': 'div',
  '%': 'mod',
  '^': 'pow'
};

function mostraUtilizzo() {
  console.log('\n📖 Utilizzo:');
  console.log('   node calcolatrice.js <numero1> <operazione> <numero2>');
  console.log('\n🔢 Operazioni disponibili:');
  console.log('   add (+)   addizione');
  console.log('   sub (-)   sottrazione');
  console.log('   mul (x)   moltiplicazione');
  console.log('   div (/)   divisione');
  console.log('   mod (%)   resto della divisione');
  console.log('   pow (^)   elevamento a potenza');
  console.log('\n💡 Esempi:');
  console.log('   node calcolatrice.js 5 add 3');
  console.log('   node calcolatrice.js 10 / 4');
  console.log('   node calcolatrice.js 2 pow 8');
  console.log();
}

// Converte un argomento (stringa) in numero, accettando anche la virgola decimale
function leggiNumero(testo) {
  const numero = Number(testo.replace(',', '.'));

  if (testo.trim() === '' || Number.isNaN(numero)) {
    console.log(`❌ Errore: "${testo}" non è un numero valido!`);
    mostraUtilizzo();
    process.exit(1);
  }

  return numero;
}

function calcolatrice() {
  // Ottieni gli argomenti (escludendo i primi due)
  const args = process.argv.slice(2);

  // Verifica che siano stati passati esattamente tre argomenti
  if (args.length !== 3) {
    console.log('❌ Errore: Devi fornire due numeri e una operazione!');
    mostraUtilizzo();
    process.exit(1);
  }

  const a = leggiNumero(args[0]);
  const b = leggiNumero(args[2]);

  // Riconosci l'operazione, scritta come nome (add) oppure come simbolo (+)
  let nome = args[1].toLowerCase();
  if (simboli[nome] !== undefined) {
    nome = simboli[nome];
  }

  const operazione = operazioni[nome];

  if (operazione === undefined) {
    console.log(`❌ Errore: operazione "${args[1]}" non riconosciuta!`);
    mostraUtilizzo();
    process.exit(1);
  }

  // La divisione (e il resto) per zero non è possibile
  if ((nome === 'div' || nome === 'mod') && b === 0) {
    console.log('❌ Errore: impossibile dividere per zero!');
    process.exit(1);
  }

  const risultato = operazione.calcola(a, b);

  // Stampa il risultato
  console.log(`${a} ${operazione.simbolo} ${b} = ${risultato}`);
}

// Esegui la funzione
calcolatrice();

// Output di esempio, eseguendo `node calcolatrice.js 5 add 3`:
// 5 + 3 = 8

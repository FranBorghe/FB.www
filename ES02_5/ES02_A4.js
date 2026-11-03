#!/usr/bin/env node

/**
 * Esercizio a4 - funzioni
 *
 * Completare l'oggetto operazioni in modo da generare questo output:
 *   oggetto operazioni
 *   100 + 100 = 200
 *   100 - 7 = 93
 *   5 * 5 = 25
 *   100 / 5 = 20
 *
 * Utilizzo:
 *   node ES02_A4.js
 */

// Un oggetto può contenere sia dati (descrizione) sia funzioni (metodi).
// Ogni metodo restituisce una stringa già formattata, che poi viene stampata
const operazioni = {
  descrizione: 'oggetto operazioni',
  somma: (a, b) => `${a} + ${b} = ${a + b}`,
  sottrazione: (a, b) => `${a} - ${b} = ${a - b}`,
  moltiplicazione: (a, b) => `${a} * ${b} = ${a * b}`,
  divisione: (a, b) => `${a} / ${b} = ${a / b}`
};

console.log(operazioni.descrizione);
console.log(operazioni.somma(100, 100));
console.log(operazioni.sottrazione(100, 7));
console.log(operazioni.moltiplicazione(5, 5));
console.log(operazioni.divisione(100, 5));

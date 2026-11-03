#!/usr/bin/env node

/**
 * Esercizio a3 - funzioni
 *
 * - Creare un array contenente due funzioni anonime:
 *     una che stampa su console "lavoro completato!"
 *     una che stampa su console "Non sono capace!"
 * - Scrivere un ciclo for che esegua le due funzioni dell'array
 *
 * Utilizzo:
 *   node ES02_A3.js
 */

// Le funzioni sono anonime: non hanno un nome proprio,
// si raggiungono solo tramite la loro posizione nell'array
const messaggi = [
  function () {
    console.log('lavoro completato!');
  },
  function () {
    console.log('Non sono capace!');
  }
];

for (let i = 0; i < messaggi.length; i++) {
  messaggi[i]();
}

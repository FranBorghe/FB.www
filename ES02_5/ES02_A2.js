#!/usr/bin/env node

/**
 * Esercizio a2 - funzioni
 *
 * - Scrivere una funzione arrow (hoFinito) che stampa "lavoro completato!"
 * - Scrivere una funzione arrow (nonRiesco) che stampa "Non sono capace!"
 * - Scrivere la funzione pippo(callback) che stampa i numeri da 1 a 10
 *   e poi esegue la funzione di callback passata a pippo
 * - Invocare pippo passando come callback le due funzioni arrow
 *
 * Utilizzo:
 *   node ES02_A2.js
 */

const hoFinito = () => console.log('lavoro completato!');
const nonRiesco = () => console.log('Non sono capace!');

/**
 * Stampa i numeri da 1 a 10, poi esegue la callback.
 * @param {Function} callback funzione da eseguire al termine del conteggio
 */
function pippo(callback) {
  for (let i = 1; i <= 10; i++) {
    console.log(i);
  }
  callback();
}

// Si passa la funzione (senza parentesi), non il risultato della sua chiamata:
// sarà pippo a decidere quando eseguirla
pippo(hoFinito);
pippo(nonRiesco);

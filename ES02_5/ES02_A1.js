#!/usr/bin/env node

/**
 * Esercizio a1 - funzioni
 *
 * - Scrivere 4 funzioni arrow che eseguono somma, moltiplicazione,
 *   divisione e sottrazione tra i numeri 10 e 2
 * - Assegnare queste 4 funzioni agli elementi di un array
 * - Eseguire tramite ciclo for le funzioni presenti nell'array
 *
 * Utilizzo:
 *   node ES02_A1.js
 */

// Funzioni arrow: con una sola espressione il return è implicito
const somma = () => 10 + 2;
const moltiplicazione = () => 10 * 2;
const divisione = () => 10 / 2;
const sottrazione = () => 10 - 2;

// In JavaScript le funzioni sono valori: si possono mettere in un array
const operazioni = [somma, moltiplicazione, divisione, sottrazione];

// Ogni elemento dell'array è una funzione, quindi lo si invoca con ()
// funzione.name restituisce il nome della costante a cui è stata assegnata
for (let i = 0; i < operazioni.length; i++) {
  console.log(`${operazioni[i].name}: ${operazioni[i]()}`);
}

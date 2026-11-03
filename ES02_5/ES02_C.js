#!/usr/bin/env node

/**
 * Esercizio c - Chat Room con EventEmitter (Esercizio 4 di "Esercizi Pratici con EventEmitter")
 *
 * Creare una chat room con gestione utenti ed eventi:
 * - entra(username): aggiunge l'utente ed emette 'utente-entrato'
 * - esce(username): rimuove l'utente ed emette 'utente-uscito'
 * - inviaMessaggio(username, testo): verifica che l'utente sia nella chat,
 *   salva il messaggio ed emette 'nuovo-messaggio'; se il testo contiene
 *   '@tutti' emette anche 'menzione-tutti'
 *
 * Obiettivo: gestire entrate, uscite e messaggi con notifiche appropriate.
 *
 * Utilizzo:
 *   node ES02_C.js
 */

const EventEmitter = require('events');

class ChatRoom extends EventEmitter {
  constructor(nome) {
    super();
    this.nome = nome;
    this.utenti = new Set();
    this.messaggi = [];
  }

  entra(username) {
    // Il Set non ammette duplicati, ma segnaliamo comunque il caso come errore
    if (this.utenti.has(username)) {
      this.emit('error', new Error(`${username} è già nella chat`));
      return;
    }
    this.utenti.add(username);

    // Si passa sempre un oggetto: in futuro si possono aggiungere campi senza cambiare i listener
    this.emit('utente-entrato', { username, online: this.utenti.size, timestamp: new Date() });
  }

  esce(username) {
    // delete restituisce false se l'utente non era presente
    if (!this.utenti.delete(username)) {
      this.emit('error', new Error(`${username} non è nella chat`));
      return;
    }
    this.emit('utente-uscito', { username, online: this.utenti.size, timestamp: new Date() });
  }

  inviaMessaggio(username, testo) {
    if (!this.utenti.has(username)) {
      this.emit('error', new Error(`${username} non può scrivere: non è nella chat`));
      return;
    }

    const messaggio = {
      username,
      testo,
      timestamp: new Date()
    };

    this.messaggi.push(messaggio);

    this.emit('nuovo-messaggio', messaggio);

    if (testo.includes('@tutti')) {
      // I destinatari sono tutti gli utenti online tranne chi ha scritto
      const destinatari = this.getUtentiOnline().filter((u) => u !== username);
      this.emit('menzione-tutti', { mittente: username, destinatari, testo });
    }
  }

  getUtentiOnline() {
    return Array.from(this.utenti);
  }
}

// Ora del messaggio nel formato hh:mm:ss
const ora = (data) => data.toLocaleTimeString('it-IT');

const chat = new ChatRoom('Programmatori');

// Listener per utenti che entrano/escono
chat.on('utente-entrato', ({ username, online }) => {
  console.log(`[${chat.nome}] ${username} entra nella chat (online: ${online})`);
});

chat.on('utente-uscito', ({ username, online }) => {
  console.log(`[${chat.nome}] ${username} esce dalla chat (online: ${online})`);
});

// once: il benvenuto viene dato solo al primo utente che entra, poi il listener si rimuove da solo
chat.once('utente-entrato', ({ username }) => {
  console.log(`[${chat.nome}] ${username} ha aperto la chat, benvenuto!`);
});

// Listener per nuovi messaggi
chat.on('nuovo-messaggio', ({ username, testo, timestamp }) => {
  console.log(`(${ora(timestamp)}) ${username}: ${testo}`);
});

// Listener per menzioni
chat.on('menzione-tutti', ({ mittente, destinatari }) => {
  destinatari.forEach((utente) => {
    console.log(`  -> notifica per ${utente}: ${mittente} ha menzionato tutti`);
  });
});

// Senza un listener su 'error', un emit('error') farebbe terminare il programma
chat.on('error', (errore) => {
  console.error(`[ERRORE] ${errore.message}`);
});

// Test
chat.entra('Mario');
chat.entra('Luigi');
chat.entra('Anna');
chat.inviaMessaggio('Mario', 'Ciao a tutti!');
chat.inviaMessaggio('Luigi', 'Ciao @tutti!');
chat.inviaMessaggio('Giulia', 'Posso scrivere?');
chat.entra('Mario');
chat.esce('Luigi');
chat.esce('Luigi');

console.log(`Utenti online: ${chat.getUtentiOnline().join(', ')}`);
console.log(`Messaggi inviati: ${chat.messaggi.length}`);

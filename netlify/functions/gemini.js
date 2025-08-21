// netlify/functions/gemini.js

// Importa il modulo 'node-fetch' per effettuare richieste HTTP
// Netlify lo installerà automaticamente per te
const fetch = require('node-fetch');

// L'handler della funzione Netlify è una funzione asincrona che riceve l'evento e il contesto
exports.handler = async (event, context) => {
    // Ottieni la chiave API dalla variabile d'ambiente di Netlify.
    // Il nome della variabile deve corrispondere a quello che hai configurato
    // nella dashboard di Netlify.
    const API_KEY = process.env.GEMINI_API_KEY;

    // Verifica che il metodo della richiesta sia POST e che la chiave API sia configurata
    if (event.httpMethod !== 'POST' || !API_KEY) {
        return {
            statusCode: 405, // Codice di stato "Method Not Allowed"
            body: JSON.stringify({ error: 'Method not allowed or API key not configured.' })
        };
    }

    try {
        // Parsa il corpo della richiesta JSON che contiene la cronologia della chat
        const payload = JSON.parse(event.body);
        const chatHistory = payload.contents;

        // URL dell'API di Gemini
        // Utilizziamo il modello gemini-2.5-flash-preview-05-20
        const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=";

        // Effettua la chiamata all'API di Gemini
        const response = await fetch(GEMINI_API_URL + API_KEY, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Invia la cronologia della chat nel corpo della richiesta
            body: JSON.stringify({ contents: chatHistory })
        });

        // Controlla se la risposta è andata a buon fine (codice 200)
        if (!response.ok) {
            // Se la risposta non è OK, solleva un errore
            throw new Error(`API call failed with status: ${response.status}`);
        }

        // Estrai il risultato in formato JSON
        const result = await response.json();

        // Ritorna la risposta dell'API di Gemini al client
        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };
    } catch (error) {
        // Gestione degli errori
        console.error("Gemini API error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "An error occurred while processing your request." })
        };
    }
};

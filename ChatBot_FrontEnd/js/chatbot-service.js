import { API_URL } from './config.js';

function buildUrl(message) {
    return `${API_URL}/consultAnswer?question=${encodeURIComponent(message)}`;
}

// Error handling
function handleError(error) {
    return 'Lo siento, algo salió mal.'; 
}

//Method that queries the server to obtain a response from the chatbot
export function fetchChatBot(message) {
    const url = buildUrl(message);
    console.log(url);
    return fetch(url)
        .then(response => response.json()) 
        .then(data => data.response) 
        .catch(handleError); 
}
import { fetchChatBot } from './chatbot-service.js';

class ChatBot extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();
        this.setupElements();
        this.sendWelcomeMessage();
    }

    // Method to render Shadow DOM content
    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./css/chatbot-styles.css">
            <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.8/css/line.css">
            <div class="chat-container hidden">
                <div id="window-header">
                    <div class="header-content">
                        <div class="logo">
                         <img src="./favicon.ico" alt="Descripción de la imagen" width=100% height=100%>
                        </div>
                        <h3>Demo ChatBot</h3>
                        <button id="close-btn">✖</button>
                    </div>
                </div>

                <div id="chat-window">
                    <div id="output"></div>
                    <div id="predefined-options" class="hidden">
                        <button class="option-btn">¿Cómo contactar con soporte técnico?</button>
                        <button class="option-btn">¿Cuáles servicios ofrecen?</button>
                        <button class="option-btn">¿Cuál es el horario de atención?</button>
                    </div>
                </div>
                <div id="input-container">
                    <input id="user-input" type="text" placeholder="Escribe tu mensaje aquí..." autofocus>
                    <button id="send-btn"><i class="uil uil-message"></i></button>
                </div>
            </div>

            
            <button id="chatbot-toggle-btn"><i class="uil uil-comment-dots"></i></button>
        `;
    }

    // Method to set references to DOM elements
    setupElements() {
        this.chat = this.shadowRoot.querySelector('.chat-container');
        this.userInput = this.shadowRoot.querySelector('#user-input');
        this.sendBtn = this.shadowRoot.querySelector('#send-btn');
        this.output = this.shadowRoot.querySelector('#output');
        this.toggleBtn = this.shadowRoot.querySelector('#chatbot-toggle-btn');
        this.closeBtn = this.shadowRoot.querySelector('#close-btn');

        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });
        this.toggleBtn.addEventListener('click', () => this.toggleChat());
        this.closeBtn.addEventListener('click', () => this.closeChat());
    }

    // Shows the predefined options to choose from if you do not recognize the question
    showPredefinedOptions() {
        const predefinedOptions = this.shadowRoot.querySelector('#predefined-options');
        predefinedOptions.classList.remove('hidden');

        const optionButtons = predefinedOptions.querySelectorAll('.option-btn');

        // Remove any previous duplicate listeners
        optionButtons.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);


            newButton.addEventListener('click', (e) => {
                this.optionSelection(e.target.textContent);
            });
        });
    }

    // Displays the message selected by the user
    optionSelection(option) {

        this.appendMessage('user-message', option);

        fetchChatBot(option)
            .then(response => {
                this.appendMessage('bot-message', response);
            })
            .catch(() => {
                this.appendMessage('bot-message', 'Lo siento, hubo un error al procesar tu mensaje.');
            });

        const predefinedOptions = this.shadowRoot.querySelector('#predefined-options');
        predefinedOptions.classList.add('hidden');
    }


    //Send the user's message to the chatbot and show the response
    sendMessage() {
        const message = this.userInput.value.trim();
        if (message === '') return;

        this.appendMessage('user-message', message);
        this.userInput.value = '';

        fetchChatBot(message)
            .then(response => {
                if (response === 'No estoy seguro de entender tu pregunta.') {
                    this.appendMessage('bot-message', response + " ¿Te refieres a alguna de estas preguntas?");
                    this.showPredefinedOptions();
                } else {
                    this.appendMessage('bot-message', response);
                }
            })
            .catch(() => {
                this.appendMessage('bot-message', 'Lo siento, hubo un error al procesar tu mensaje.');
            });
    }

    //Set the welcome message
    sendWelcomeMessage() {
        const welcomeMessage = '¡Hola! Bienvenido a nuestro servicio de atención al cliente. ¿En qué puedo ayudarte hoy?';
        this.appendMessage('bot-message', welcomeMessage);
    }

    //Add a message to the chat output area
    appendMessage(className, message) {
        const newMessage = document.createElement('div');
        newMessage.classList.add('message', className);
        newMessage.textContent = message;
        this.output.appendChild(newMessage);
        this.output.scrollTop = this.output.scrollHeight;
    }

    //Open the chat
    toggleChat() {
        if (this.chat.classList.contains('hidden')) {
            this.chat.classList.remove('hidden');
            this.toggleBtn.style.display = 'none';
        } else {
            this.chat.classList.add('hidden');
            this.toggleBtn.style.display = 'block';
        }
    }

    //Close the chat by hiding it
    closeChat() {
        this.chat.classList.add('hidden');
        this.toggleBtn.style.display = 'block';
    }
}

customElements.define('chat-bot', ChatBot);

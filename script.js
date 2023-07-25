// Variables
let recognizing = false;
let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

// Configuración del reconocimiento de voz
recognition.lang = 'es-ES';
recognition.interimResults = true;
recognition.continuous = true;

// Evento para manejar los resultados del reconocimiento
recognition.onresult = (event) => {
    const result = event.results[event.resultIndex][0].transcript;
    document.getElementById('output').innerHTML = result;
};

// Evento para manejar el inicio del reconocimiento
recognition.onstart = () => {
    recognizing = true;
    document.getElementById('output').innerHTML = 'Escuchando...';
};

// Evento para manejar el fin del reconocimiento
recognition.onend = () => {
    recognizing = false;
    document.getElementById('output').innerHTML = 'Reconocimiento detenido.';
};

// Eventos para los botones
document.getElementById('startButton').addEventListener('click', () => {
    if (!recognizing) {
        recognition.start();
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    if (recognizing) {
        recognition.stop();
    }
});

document.getElementById('speakButton').addEventListener('click', () => {
    const textToSpeak = document.getElementById('output').innerText;
    if ('speechSynthesis' in window) {
        const synthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        synthesis.speak(utterance);
    } else {
        alert('Tu navegador no es compatible con el dictado a voz.');
    }
});

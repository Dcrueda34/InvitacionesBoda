const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

// Tamaño del lienzo
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caracteres posibles para la lluvia
const characters = '0000, 0001, 0010, 0011, 0100, 0101, 0110, 0111, 1000, 1001, 1010, 1011, 1100, 1101, 1110, 1111';
const fontSize = 16;
const speed = 2;

// Número de caracteres que se mostrarán en una columna
const columns = canvas.width / fontSize;

// Array para almacenar las posiciones verticales de los caracteres
let drops = [];

// Inicialización de las posiciones de los caracteres
for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * canvas.height); // Posición aleatoria en el lienzo
}

// Cargar el video de Jesús
const jesusVideo = document.createElement('video');
jesusVideo.src = '/static/videos/Jesus.mp4'; // Ruta correcta en Flask
jesusVideo.autoplay = false; // No reproducir automáticamente
jesusVideo.loop = false;
jesusVideo.muted = false; // Asegúrate de que el video no esté silenciado
jesusVideo.volume = 1.0; // Asegúrate de que el volumen esté al máximo

// Tamaño del video
const videoWidth = 400;
const videoHeight = 430;

// Posición inicial para la animación del video
let jesusX = (canvas.width - videoWidth) / 2;
let jesusY = (canvas.height - videoHeight) / 2;

// Cargar la imagen de Diana
const dianaImage = new Image();
dianaImage.src = '/static/images/Diana.png'; // Ruta correcta en Flask

// Tamaño de la imagen de Diana
const imageWidth = 400;
const imageHeight = 430;

// Posición inicial para la animación de Diana
let dianaX = -imageWidth; // Inicialmente fuera del lienzo (izquierda)
let dianaY = (canvas.height - imageHeight) / 2;

// Tiempo en el que comienza la animación de Diana (en segundos)
const dianaAnimationStartTime = 5; // 5 segundos

// Cargar la imagen de Alain
const alainImage = new Image();
alainImage.src = '/static/images/Alain.png'; // Ruta correcta en Flask

// Tamaño de la imagen de Alain
const alainImageWidth = 400;
const alainImageHeight = 430;

// Posición inicial para la animación de Alain
let alainX = canvas.width; // Inicialmente fuera del lienzo (derecha)
let alainY = (canvas.height - alainImageHeight) / 2;

// Tiempo en el que comienza la animación de Alain (en segundos)
const alainAnimationStartTime = 4; // 10 segundos

// Tiempo transcurrido desde el inicio del video
let videoStartTime = 0;

//cargar audio de fondo
window.addEventListener('load', function() {
    var backgroundAudio = document.getElementById('background-audio');
    backgroundAudio.play();
});

// Función para dibujar el video de Jesús
function drawJesus() {
    ctx.drawImage(jesusVideo, jesusX, jesusY, videoWidth, videoHeight);
}

// Función para dibujar la imagen de Diana
function drawDiana() {
    ctx.drawImage(dianaImage, dianaX, dianaY, imageWidth, imageHeight);
}

// Función para dibujar la imagen de Alain
function drawAlain() {
    ctx.drawImage(alainImage, alainX, alainY, alainImageWidth, alainImageHeight);
}

// Función para animar los caracteres
function draw() {
    // Establece el color de fondo del lienzo
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Establece el color y el tamaño del texto
    ctx.fillStyle = '#00FF41'; // Color verde para los caracteres
    ctx.font = fontSize + 'px arial';

    // Genera y muestra los caracteres
    for (let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random() * characters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reinicia la posición del carácter si alcanza la parte inferior del lienzo
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Incrementa la posición vertical del carácter
        drops[i] += speed;
    }

    // Dibujar el video de Jesús
    drawJesus();

    // Dibujar la imagen de Diana si ha pasado el tiempo
    if (videoStartTime >= dianaAnimationStartTime) {
        drawDiana();
    }

    // Dibujar la imagen de Alain si ha pasado el tiempo
    if (videoStartTime >= alainAnimationStartTime) {
        drawAlain();
    }
}

// Función de animación
function animate() {
    // Limpia el lienzo antes de dibujar de nuevo
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibuja los caracteres, el video de Jesús, la imagen de Diana y la imagen de Alain
    draw();

    // Solicita el siguiente cuadro de animación
    requestAnimationFrame(animate);
}

// Inicia la animación de caracteres
animate();

// Temporizador para controlar el tiempo del video
jesusVideo.addEventListener('play', () => {
    const startTime = Date.now();
    function checkVideoTime() {
        if (!jesusVideo.paused) {
            videoStartTime = (Date.now() - startTime) / 1000; // Convertir milisegundos a segundos

            // Animación de Diana
            if (videoStartTime >= dianaAnimationStartTime && dianaX < (jesusX - 100)) {
                // Función para mover la imagen de Diana desde el lado izquierdo hacia el centro
                function moveDiana() {
                    // Actualizar la posición de la imagen de Diana
                    if (dianaX < (jesusX - 150)) {
                        dianaX += 0.05; // Velocidad de movimiento (ajustar según sea necesario)
                        requestAnimationFrame(moveDiana);
                    }
                }
                moveDiana();
            }

            // Animación de Alain
            if (videoStartTime >= alainAnimationStartTime && alainX > (jesusX + 100)) {
                // Función para mover la imagen de Alain desde el lado derecho hacia el centro
                function moveAlain() {
                    // Actualizar la posición de la imagen de Alain
                    if (alainX > (jesusX + 150)) {
                        alainX -= 0.05; // Velocidad de movimiento (ajustar según sea necesario)
                        requestAnimationFrame(moveAlain);
                    }
                }
                moveAlain();
            }

            requestAnimationFrame(checkVideoTime);
        }
    }
    checkVideoTime();
});

// Botón para reproducir el video
const playButton = document.getElementById('playButton');
const thumbnail = document.getElementById('video-thumbnail');

playButton.addEventListener('click', () => {
    // Ocultar la imagen de portada y el botón cuando el video empieza a reproducirse
    playButton.style.display = 'none';
    jesusVideo.play().catch(error => {
        console.error('Error al reproducir el video:', error);
    });
});

function redirectToInvitation() {
    window.location.href = '/pildoraAzul';
}


function redirectToConfirmation() {
    window.location.href = '/pildoraRoja';
}

function devolver() {
    window.location.href = '/';
}

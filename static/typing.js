document.addEventListener("DOMContentLoaded", function() {
    const textElement = document.getElementById('typing-text');
    const text = `
Redefine la realidad en una boda que desafía los límites de la percepción. 🌌✨

Fecha: 9 de Noviembre de 2024 
Hora: 4:00 PM

Ubicación: Cra 2 # 30-112sur  - El lugar donde el código de amor se convierte en realidad

Instrucciones de Vestimenta: No es necesario elegir entre la píldora roja o la azul, pero asegúrate de que tus tennis sean tan elegantes como el amor eterno que estamos celebrando.

Prepárate para hackear el sistema de las bodas y sumérgete en una noche de amor que será legendaria. ¿Estás listo para aceptar el desafío? 🏆....
    `;
    const typingSpeed = 50; // Tiempo en milisegundos entre cada letra

    let index = 0;

    function type() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, typingSpeed);
        } else {
            textElement.classList.add('typing'); // Añade la animación de cursor al final
        }
    }

 
    type(); // Inicia el efecto de escritura
});

function devolver() {
    window.location.href = '/';
}

window.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".words");
    const words = container.querySelectorAll("p");
    const wordArray = Array.from(words);

    // Función para verificar colisión entre dos elementos
    const isColliding = (elem1, elem2) => {
        const rect1 = elem1.getBoundingClientRect();
        const rect2 = elem2.getBoundingClientRect();
        return !(
            rect1.right < rect2.left ||
            rect1.left > rect2.right ||
            rect1.bottom < rect2.top ||
            rect1.top > rect2.bottom
        );
    };

    // Función para mover una palabra hasta que no colisione con otras palabras
    const moveWord = (word, wordArray) => {
        let offsetX = 0;
        let offsetY = 0;
        let collides = false;

        do {
            collides = wordArray.some(otherWord => {
                if (otherWord !== word) {
                    if (isColliding(word, otherWord)) {
                        return true;
                    }
                }
                return false;
            });

            if (collides) {
                offsetX += 5; // Incremento para evitar la colisión
                offsetY += 5; // Incremento para evitar la colisión
                word.style.left = `${parseInt(word.style.left) + offsetX}px`;
                word.style.top = `${parseInt(word.style.top) + offsetY}px`;
            }
        } while (collides);
    };

    // Posicionar cada palabra en una ubicación aleatoria dentro del contenedor
    wordArray.forEach(word => {
        const randomX = Math.floor(Math.random() * (container.offsetWidth - word.offsetWidth));
        const randomY = Math.floor(Math.random() * (container.offsetHeight - word.offsetHeight));
        
        word.style.position = "absolute";
        word.style.left = `${randomX}px`;
        word.style.top = `${randomY}px`;

        moveWord(word, wordArray);
    });

    // Agregar clase w1 y aumentar en 1 para cada palabra
    wordArray.forEach((word, index) => {
        word.classList.add(`w${index + 1}`);
    });
});

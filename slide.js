const contenido = ["gym.html", "retroshop.html","patrimonio.html"]; // Agrega aquí los nombres de tus archivos HTML
        let indice = 0; // Índice actual del contenido

        // Evento al hacer clic en el botón de avance
        document.querySelector(".adelante").addEventListener("click", () => {
            indice = (indice + 1) % contenido.length; // Avanzar al siguiente contenido (ciclo)
            cargarContenido();
        });

        // Evento al hacer clic en el botón de retroceso
        document.querySelector(".atras").addEventListener("click", () => {
            indice = (indice - 1 + contenido.length) % contenido.length; // Retroceder al contenido anterior (ciclo)
            cargarContenido();
        });

        // Función para cargar el contenido en el iframe
        const cargarContenido = () => {
            const iframe = document.querySelector("#efecto iframe");
            iframe.src = contenido[indice];
        };
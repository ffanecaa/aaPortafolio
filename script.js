


    let menu = document.querySelector('.menu');
    let hamb = document.querySelector('.hamb');
   
    hamb.addEventListener('click', () => {
    
    menu.classList.toggle('active') // Agrega o quita la clase 'active' al menú
    hamb.classList.toggle('active'); // Agrega o quita la clase 'active' al botón de hamburguesa
   
    });

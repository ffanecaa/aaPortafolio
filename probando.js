// Obtener los elementos contenedores de cada proyecto
const gymContainer = document.getElementById('gym');
const retroshopContainer = document.getElementById('retroshop');
const patrimContainer = document.getElementById('patrimonio');

const patrimon = document.getElementById('patribtn');
const retro = document.getElementById('retrobtn');
const gyms = document.getElementById('gymbtn');
// const next = document.getElementById('adelante');
// const prev = document.getElementById('atras');
const next = document.querySelectorAll('.adelante');
const prev = document.querySelectorAll('.atras');


let currentProject = 'gym';


retro.addEventListener('click', ()=>{
    showProject('retroshop')
})
gyms.addEventListener('click', ()=>{
    showProject('gym')
})
patrimon.addEventListener('click', ()=>{
    showProject('patrimonio')
})


// Obtener el parámetro currentIndex de la URL
const urlParams = new URLSearchParams(window.location.search);
 const current = urlParams.get('current');

// Ahora puedes usar currentIndex como desees
console.log(current);
showProject(current)

// Función para mostrar solo un proyecto a la vez
function showProject(projectToShow) {
    // Ocultar todos los contenedores de proyecto
    gymContainer.style.display = 'none';
    retroshopContainer.style.display = 'none';
    patrimContainer.style.display = 'none';

    // Remover la clase 'selected' de todos los botones
    gyms.classList.remove('selected');
    retro.classList.remove('selected');
    patrimon.classList.remove('selected');

    // Mostrar el contenedor de proyecto adecuado
    if (projectToShow === 'gym') {
        gymContainer.style.display = 'block';
        gyms.classList.add('selected'); // Agregar la clase 'selected' al botón del proyecto seleccionado
        currentProject = 'gym';
    } else if (projectToShow === 'retroshop') {
        retroshopContainer.style.display = 'block';
        retro.classList.add('selected'); // Agregar la clase 'selected' al botón del proyecto seleccionado
        currentProject = 'retroshop';
    } else if (projectToShow === 'patrimonio') {
        patrimContainer.style.display = 'block';
        patrimon.classList.add('selected'); // Agregar la clase 'selected' al botón del proyecto seleccionado
        currentProject = 'patrimonio';
    }
}


next.forEach(button =>{
button.addEventListener('click',()=>{
    navigateProject('next')
})})

prev.forEach(button =>{
button.addEventListener('click',()=>{
    navigateProject('prev')
})})

function navigateProject(direction) {
    const projects = ['gym', 'retroshop', 'patrimonio'];
    let currentIndex = projects.indexOf(currentProject);
    let newIndex;

    if (direction === 'next') {
        newIndex = (currentIndex + 1) % projects.length;
    } else if (direction === 'prev') {
        newIndex = (currentIndex - 1 + projects.length) % projects.length;
    }

    showProject(projects[newIndex]);
}


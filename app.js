const tarea = document.getElementById('tarea');
const lista = document.querySelector('.list-todo');

eventos();

function eventos() {
    document.getElementById('formulario').addEventListener('submit', agregarTarea);
    document.querySelector('.btn').addEventListener('click', agregarTarea);
    lista.addEventListener('click', borrarTarea);
    document.addEventListener('DOMContentLoaded', cargarLocalStorage);
}

function agregarTarea(e) {
    e.preventDefault();
    //Crea el li
    const texto = tarea.value
    const li = document.createElement('li');
    li.innerText = texto;
    lista.appendChild(li);
    //Crea el icono
    const trash = document.createElement('i');
    trash.classList = 'fas fa-trash';
    li.appendChild(trash);

    agregarTareaLocalStorage(texto);
}

function borrarTarea(e) {
    e.preventDefault();
    if (e.target.className === 'fas fa-trash') {
        e.target.parentElement.remove();
        borrarTareaLocalStorage(e.target.parentElement.innerText)
    }
}

function agregarTareaLocalStorage(texto) {
    let textos;
    textos = obtenerLocalStorage();
    textos.push(texto);
    localStorage.setItem('tareas', JSON.stringify(textos));
    //quita el valor despues de agregarlo
    tarea.value = '';
}

function obtenerLocalStorage() {
    let textos;
    if (localStorage.getItem('tareas') === null) {
        textos = [];
    } else {
        textos = JSON.parse(localStorage.getItem('tareas'));
    }
    return textos;
}

function cargarLocalStorage() {
    let textos;
    textos = obtenerLocalStorage();

    textos.forEach(texto => {
        const li = document.createElement('li');
        li.innerText = texto;
        lista.appendChild(li);
        const trash = document.createElement('i');
        trash.classList = 'fas fa-trash';
        li.appendChild(trash);
    });
}

function borrarTareaLocalStorage(texto) {
    let textos;
    textos = obtenerLocalStorage();

    textos.forEach(function (elem, index) {
        if (texto === elem) {
            textos.splice(index, 1);
        }
    });
    localStorage.setItem('tareas', JSON.stringify(textos));
}
//Variables
const carrito = document.getElementById("carrito"),
      listaCursos = document.getElementById("lista-cursos"),
      contenedorCarrito = document.querySelector('.buy-card .lista_de_cursos'),
      vaciarCarritoBtn = document.querySelector('#vaciar_carrito');

let articulosCarrito = [];

registrarEventsListeners()

function registrarEventsListeners() {
    //Cuando yo le de click a "agregar al carrito de compras"
    listaCursos.addEventListener('click', agregarCurso);


    //Eliminar curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', e => {
        articulosCarrito = [];
        limpiarHTML()
    })
}

function agregarCurso(e) {
    if (e.target.classList.contains("agregar-carrito")) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerInfo(cursoSeleccionado)
    }
}

//Elimina un curso del carrito
function eliminarCurso(e) {
    if(e.target.classList.contains("borrar-curso")){
        const cursoId = e.target.getAttribute('data-id');
        
        //Eliminar del arreglo del articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)

        carritoHTML()

    }
}

//Leer el contenido de nuestro HTML al que le dimos click y extrae la info del curso
function leerInfo(curso) {
    //Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen : curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent,
        precio: curso.querySelector('.descuento').textContent,
        id : curso.querySelector('button').getAttribute('data-id'),
        cantidad : 1
    }

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)

    if (existe) {
        //Actualizar la cantidad
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso 
            } else {
                return curso;
            }
        });
        [...articulosCarrito,infoCurso]
    } else {
        //Agregamos elementos al carrito de compras
        articulosCarrito = [...articulosCarrito,infoCurso]
    }
    carritoHTML()
}

//Muestra el carrito en el HTML

function carritoHTML() {
    limpiarHTML()
    //Recorre el carrito de compras y genera el HTML
    articulosCarrito.forEach(curso => {
        const fila = document.createElement('div');
        fila.innerHTML = `
            <img src="${curso.imagen}"></img>
            <p>${curso.titulo}</p>
            <p>${curso.precio}</p>
            <p>${curso.cantidad}</p>
            <p><span class="borrar-curso" data-id="${curso.id}">X</span></p>
        `;

        contenedorCarrito.appendChild(fila)
    });
}

//Elimina los cursos de la lista_de_cursos
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}



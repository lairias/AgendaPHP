const formularioContactos = document.querySelector("#contacto");//selecionamos el form con un id contacto


//cuendo el formulario de ingresar o editar se ejevute
formularioContactos.addEventListener("submit", (e) => {
    e.preventDefault();
    //validar los input de el metodo de registro
    const nombre = document.querySelector('#nombre').value,
        empresa = document.querySelector('#empresa').value,
        telefono = document.querySelector('#telefono').value,
        accion = document.querySelector('#accion').value;
    //todos los input del form que enviaremos a la base de datos con document.querySelector('#').value
    if (nombre === '' && empresa === '' && telefono === '') {
        //enviaremos dos parametros text  clase
        mostrarNotificacion('Todos los campos son Obligatorios', 'error');

    } else {
        //pasa la validacion, crea el llamado de Ajax
        const inforContacto = new FormData();
        //creamos un constructor en Ajax
        inforContacto.append('nombre', nombre);
        inforContacto.append('empresa', empresa);
        inforContacto.append('telefono', telefono);
        inforContacto.append('accion', accion);

        if (accion === 'crear') {
            //Crearemos un nuevo contacto
            insetarBD(inforContacto)
            mostrarNotificacion('Contacto Creado', 'exito');
        } else {
            //en caso contrario lo editaremos
        }
    }
})
//Inserta en la base de datos mediante Ajax
//los enviemos mediante Ajax a php como medio de transporte
function insetarBD(datos) {
    //llamado Ajax

    //Crear el Objeto
    const xhr = new XMLHttpRequest();
    //Abrir la conexion mandaremos la accion
    //el siguiente parametro mandaremos la ruta de configutacion de Query a la base de datos
    xhr.open('POST', 'include/modelos/modelo-contactos.php', true);
    //pasar los datos onload 
    xhr.onload = function () {
        if (this.status === 200) {
            //status 200 = Correcto, 404 = No enconcontrado, 501 = Error en el servidor
            const respuesta = JSON.parse(xhr.responseText);//JSON.parse() convierte el string a un JSON

            //Inserta un nuevo contacto sin necesidad de cargar la pagina crearemos una funcion
            ContactoTable(datos)

        
        }
    }
    //enviar los datos
    xhr.send(datos)


}

//funcion de Agregar los contactos a un Table con Ajax
function ContactoTable(datos){
    const nuevoContato = document.createElement('tr');
    nuevoContato.innerHTML = `
        <td>${respuesta.datos.nombre}</td>
        <td>${respuesta.datos.empresa}</td>
        <td>${respuesta.datos.telefono}</td>

        `;
    //contenedor de los botones
    const accionesBtn = document.createElement('td')
    const IconoEditar = document.createElement('i');
    IconoEditar.classList.add('fas', ' fa-edit');
    //creamos el enlace de editat
    const BtnEditar = document.createElement('a');
    BtnEditar.appendChild(IconoEditar);
    BtnEditar.href = `editar.php?id=${respuesta.datos.id_insertado}`;
    BtnEditar.classList.add('btn', 'btn-editar')

    accionesBtn.appendChild(BtnEditar);

    /*--Creamos el icono de Eleminar--*/
    const IconoBorrar = document.createElement('i');
    IconoBorrar.classList.add('fas', 'fa-trash-alt');
    //Creamos el botton de eliminar
    const btnEliminar = document.createElement('button');
    btnEliminar.appendChild(IconoBorrar);
    btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
    btnEliminar.classList.add('btn', 'btn-borrar')
    accionesBtn.appendChild(btnEliminar)

    nuevoContato.appendChild(accionesBtn);
}


//Notificacion en pantalla cuando se agrege un contacto
function mostrarNotificacion(mensaje, clase) {

    const notificacion = document.createElement('div');
    notificacion.classList.add(clase, 'notificacion', 'sombra');
    notificacion.textContent = mensaje;

    //formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));
    //oculta y Mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');//agregamos 
        //setTimeout es una funcion que se ejecuta segun el tiempo
        setTimeout(() => {
            notificacion.classList.remove('visible');//removemos la clse visible que tiene opacity 1
            setTimeout(() => {
                notificacion.remove()//removemos el div completo con las clases
            }, 500);
        }, 3000);
    }, 100);
}
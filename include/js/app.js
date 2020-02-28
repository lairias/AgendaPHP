const formularioContactos = document.querySelector("#contacto");//selecionamos el form con un id contacto


//cuendo el formulario de ingresar o editar se ejevute
formularioContactos.addEventListener("submit", (e)=>{
    e.preventDefault();
    //validar los input de el metodo de registro
    const nombre = document.querySelector('#nombre').value,empresa=document.querySelector('#empresa').value, telefono = document.querySelector('#telefono').value,//todos los input del form que enviaremos a la base de datos con document.querySelector('#').value
    accion=document.querySelector('#accion').value;


    if(nombre === '' && empresa === '' && telefono && ''){
        //enviaremos dos parametros text  clase
        mostrarNotificacion('Todos los campos son Obligatorios','error');
    }else {
        //pasa la validacion, crea el llamado de Ajax
        const inforContacto = new FormData();
        inforContacto.append('nombre',nombre);
        inforContacto.append('empresa', empresa);
        inforContacto.append('telefono', telefono);
        inforContacto.append('accion', accion);

        if(accion === 'crear'){
            //Crearemos un nuevo contacto
            insetarBD(inforContacto)
        }else{
            //en caso contrario lo editaremos
        }
    }

})

//Inserta en la base de datos mediante Ajax
//los enviemos mediante Ajax a php como medio de transporte
function insetarBD(datos){
//llamado Ajax

//Crear el Objeto
const xhr = new XMLHttpRequest();
//Abrir la conexion
xhr.open('POST','include/modelos/modelo-contactos.php',true);
//pasar los datos
xhr.onload = function(){
    if(this.status === 200){
       const  respuesta = JSON.parse(xhr.responseText);//JSON.parse() convierte el string a un JSON

        //Inserta un nuevo contacto sin necesidad de cargar la pagina
        const nuevoContato = document.createElement('tr');
        nuevoContato.innerHTML =`
        <td>${respuesta.datos.nombre}</td>
        <td>${respuesta.datos.empresa}</td>
        <td>${respuesta.datos.telefono}</td>

        `;
        //contenedor de los botones
        const accionesBtn = document.createElement('td')
        const IconoEditar = document.createElement('i');
        IconoEditar.classList.add('fas',' fa-edit');
        //creamos el enlace de editat
        const BtnEditar = document.createElement('a');
        BtnEditar.appendChild(IconoEditar);
        BtnEditar.href =`editar.php?id=${respuesta.datos.id_insertado}`;
        BtnEditar.classList.add('btn','btn-editar')

        accionesBtn.appendChild(BtnEditar);

        /*--Creamos el icono de Eleminar--*/
        const IconoBorrar = document.createElement('i');
        IconoBorrar.classList.add('fas', 'fa-trash-alt');
        //Creamos el botton de eliminar
        const btnEliminar = document.createElement('button');
        btnEliminar.appendChild(IconoBorrar);
        btnEliminar.setAttribute('data-id', respuesta.datos.id_insertado);
        btnEliminar.classList.add('btn','btn-borrar')
        accionesBtn.appendChild(btnEliminar)
        
        nuevoContato.appendChild(accionesBtn);
    }
}
//enviar los datos
xhr.send(datos)
    mostrarNotificacion('Contacto Creado', 'exito');

}

//Notificacion en pantalla cuando se agrege un contacto
function mostrarNotificacion(mensaje, clase){

    const notificacion = document.createElement('div');
    notificacion.classList.add(clase,'notificacion','sombra');
    notificacion.textContent= mensaje;

    //formulario
    formularioContactos.insertBefore(notificacion, document.querySelector('form legend'));
    //oculta y Mostrar la notificacion
    setTimeout(() => {
        notificacion.classList.add('visible');//agregamos 
        setTimeout(() => {
            notificacion.classList.remove('visible');//removemos la clse visible que tiene opacity 1
            setTimeout(() => {
                notificacion.remove()//removemos el div completo con las clases
            }, 500);
        }, 3000);
    }, 100);
}
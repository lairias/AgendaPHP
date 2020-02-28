<?php include 'include/layout/header.php';?>

<div class="contenedor-barra">
<h1>Agenda de Contacto</h1>
</div>
<div class="bg-amarillo contenedor sombra">

<form action="#" id="contacto" >
<legend> Edite un Contacto <br><span></span></legend>

    <?php include 'include/layout/formulario.php';?>

</form>
</div>

<div class="bg-blanco contenedor sombra contactos">
    <div class="contenedor-contactos">
        <h2>Contactos</h2>
        <input type="text" id="buscar" class='buscador sombra' placeholder='Buscador de Contactos...'>
        <p class="total-contactos"><span></span> Contactos</p>
        <div class="contenedor">
            <table id="listado-contactos" class="listado-contactos">
                <thead>
                    <th>Nombre</th>
                    <th>empresa</th>
                    <th>Telefono</th>
                    <th>Acciones</th>
                </thead>
                <tbody>
                    <tr>
                        <td> Juan</td>
                        <td> Udemy</td>
                        <td> 2567890</td>
                        <td>
                            <a class='btn-editar btn'href="editar.php?id=1"> <i class="fas fa-edit"></i>
                        <button  data-id='1' type='button' class='btn-borrar btn'>
                            <i class="fas fa-trash-alt"></i>
                        </button></a>
                        </td>
                    </tr>
                       
                </tbody>
            </table>
        </div>
    </div>
</div>


<?php include 'include/layout/footer.php';?>
<?php
if($_POST['accion'] == 'crear'){
    //Creara un nuevo registro en la base de datos
    require_once('..//funciones/db.php');
    //validamos las entradas que los datos sean correctos
    $nombre = filter_var($_POST['nombre'], FILTER_SANITIZE_STRING);
    $empresa = filter_var($_POST['empresa'], FILTER_SANITIZE_STRING);
    $telefono = filter_var($_POST['telefono'], FILTER_SANITIZE_STRING);
//Try catch nos indica que cundo un error ocurre el programa no se caiga
try{
    //creamos el query a la conexion a la base de datos pero con procteccion que no acepte codigo de SQL
$stmt = $conn->prepare("INSERT INTO contactos(nombre, empresa, telefono) VALUES (?, ?, ?)");
$stmt->bind_param('sss',$nombre,$empresa,$telefono);
$stmt->execute();//Ejecutamos el Query

if($stmt->affected_rows == 1){
    $respuesta = Array(
    'respuesta' =>'correcto','id_insertado'=>$stmt->insert_id//Mustras un numerp de las filas y columnas insertadas
);
}


$stmt->close();//Cerrramos el stmt 
$conn->close();//Cerramos la coneccion de mysql
//encaso de un error que lo mande a la consola con Ajax
} catch(Exception $e){
    $respuesta = Array(
        'error'=> $e->getMessage()
    );
}

}


echo json_encode($respuesta);
/* Creamos un CRUD con Ajax y PHP */
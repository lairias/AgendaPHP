<?php
define('DB_USUARIO','root');
define('DB_PASSWORD','');
define('DB_HOST','127.0.0.1');
define('DB_NAME','agendaphp');

$conn = new mysqli(DB_HOST,DB_USUARIO,DB_PASSWORD,DB_NAME);
/* echo $conn->ping(); */
?>
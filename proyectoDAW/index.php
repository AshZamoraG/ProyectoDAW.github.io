<?php
/* Mostrar errores */
ini_set('display_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', "C:/xampp/htdocs/proyectoDAW/php_error_log");
/*Encabezada de las solicitudes*/
/*CORS*/
header("Access-Control-Allow-Origin: * ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
//header('Content-Type: application/json');
/*--- Requerimientos Clases o librerías*/
require_once "models/MySqlConnect.php";
/***--- Agregar todos los modelos*/
require_once "models/UsuarioModel.php";
require_once "models/ProductoModel.php";
require_once "models/Categoria.php";
require_once "models/Subcategoria.php";

/***--- Agregar todos los controladores*/
require_once "controllers/UsuarioController.php";
require_once "controllers/ProductoController.php";
require_once "controllers/CategoriaController.php";
require_once "controllers/SubcategoriaController.php";
//Enrutador
//RoutesController.php
require_once "controllers/RoutesController.php";
$index = new RoutesController();
$index->index();

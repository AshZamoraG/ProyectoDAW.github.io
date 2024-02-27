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
require_once "models/CategoriaModel.php";
require_once "models/SubcategoriaModel.php";
require_once "models/BodegaModel.php";
require_once "models/ProveedorModel.php";
require_once "models/InventarioModel.php";
require_once "models/SalidadInventarioModel.php";
require_once "models/SalidaXProductoModel.php";
require_once "models/TrasladoModel.php";
require_once "models/TrasladoXProductoModel.php";
require_once "models/UsuarioXBodegaModel.php";
require_once "models/OrdenCompraModel.php";
require_once "models/OrdenXProductoModel.php";
require_once "models/ContactosModel.php";
require_once "models/UsuarioXBodegaModel.php";

/***--- Agregar todos los controladores*/
require_once "controllers/UsuarioController.php";
require_once "controllers/ProductoController.php";
require_once "controllers/CategoriaController.php";
require_once "controllers/SubcategoriaController.php";
require_once "controllers/BodegaController.php";
require_once "controllers/ProveedorController.php";
require_once "controllers/InventarioController.php";
require_once "controllers/SalidaInventarioController.php";
require_once "controllers/SalidaXProductoController.php";
require_once "controllers/TrasladoController.php";
require_once "controllers/TrasladoXProductoController.php";
require_once "controllers/UsuarioXBodegaController.php";
require_once "controllers/OrdenCompraController.php";
require_once "controllers/OrdenXProductoController.php";
require_once "controllers/ContactosController.php";
require_once "controllers/UsuarioXBodegaController.php";
//Enrutador
//RoutesController.php
require_once "controllers/RoutesController.php";
$index = new RoutesController();
$index->index();

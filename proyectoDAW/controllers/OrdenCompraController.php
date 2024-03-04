<?php

class ordencompra
{
  public function index()
  {
    $ordencompraM = new OrdenCompraModel;
    $response = $ordencompraM->all();
    if (isset($response) && !empty($response)) {
      $json = array(
        'status' => 200,
        'results' => $response
      );
    } else {
      $json = array(
        'status' => 400,
        'results' => "No hay registros"
      );
    }
    echo json_encode($json,
    http_response_code($json["status"]));
  }

  public function get($id)
  {
      //Instancia del modelo
      $ordencompraM = new OrdenCompraModel();
      //Acción del modelo a ejecutar
      $response = $ordencompraM->get($id);
      //Verificar respuesta
      if (isset($response) && !empty($response)) {
          //Armar el JSON respuesta satisfactoria
          $json = array(
              'status' => 200,
              'results' => $response
          );
      } else {
          //JSON respuesta negativa
          $json = array(
              'status' => 400,
              'results' => "No existe el recurso solicitado"
          );
      }
      //Escribir respuesta JSON con código de estado HTTP
      echo json_encode(
          $json,
          http_response_code($json["status"])
      );
  }

  public function getOrdenCompraById($id)
  {
      //Instancia del modelo
      $ordencompraM = new OrdenCompraModel();
      //Acción del modelo a ejecutar
      $response = $ordencompraM->getOrdenCompraById($id);
      //Verificar respuesta
      if (isset($response) && !empty($response)) {
          //Armar el JSON respuesta satisfactoria
          $json = array(
              'status' => 200,
              'results' => $response
          );
      } else {
          //JSON respuesta negativa
          $json = array(
              'status' => 400,
              'results' => "No existe el recurso solicitado"
          );
      }
      //Escribir respuesta JSON con código de estado HTTP
      echo json_encode(
          $json,
          http_response_code($json["status"])
      );
  }

  
  public function OrdenCompraFactura($id)
  {
      //Instancia del modelo
      $ordencompraM = new OrdenCompraModel();
      //Acción del modelo a ejecutar
      $response = $ordencompraM->OrdenCompraFactura($id);
      //Verificar respuesta
      if (isset($response) && !empty($response)) {
          //Armar el JSON respuesta satisfactoria
          $json = array(
              'status' => 200,
              'results' => $response
          );
      } else {
          //JSON respuesta negativa
          $json = array(
              'status' => 400,
              'results' => "No existe el recurso solicitado"
          );
      }
      //Escribir respuesta JSON con código de estado HTTP
      echo json_encode(
          $json,
          http_response_code($json["status"])
      );
  }
}

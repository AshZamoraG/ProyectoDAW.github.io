<?php

class contactos
{
  public function index()
  {
    $contactosM = new ContactosModel;
    $response = $contactosM->all();
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
      $contactoM = new ContactosModel();
      //Acción del modelo a ejecutar
      $response = $contactoM->get($id);
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
<?php

class subcategoria
{
  public function index()
  {
    $subcategoriaM = new SubCategoriaModel;
    $response = $subcategoriaM->all();
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
}
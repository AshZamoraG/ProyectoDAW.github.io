<?php
class SubcategoriaModel
{
  //Conectarse a la BD
  public $enlace;

  public function __construct()
  {
    $this->enlace = new MySqlConnect();
  }
  /**
   * Listar peliculas
   * @param 
   * @return $vResultado - Lista de objetos
   */
  public function all()
  {
    try {
      //Consulta SQL
      $vSQL = "SELECT * FROM Subcategoria;";
      //Ejecutar la consulta
      $vResultado = $this->enlace->ExecuteSQL($vSQL);
      //Retornar la respuesta

      return $vResultado;
    } catch (Exception $e) {
      die("" . $e->getMessage());
    }
  }
  public function get($id)
  {
    try {
      $vSql = "SELECT * from subcategoria where Idsubcategoria = $id";

      //Ejecutar la consulta sql
      $vResultado = $this->enlace->executeSQL($vSql);
      if (!empty($vResultado)) {
        //Obtener objeto
        $vResultado = $vResultado[0];
      }
      return $vResultado;
    } catch (Exception $e) {
      die($e->getMessage());
    }
  }
  public function get($id)
    {
        //Instancia del modelo
        $subcategoria = new SubcategoriaModel();
        //Acción del modelo a ejecutar
        $response = $subcategoria->get($id);
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

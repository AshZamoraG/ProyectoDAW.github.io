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
      $vSQL = "SELECT * FROM subcategoria;";
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
      $vSql = "SELECT * from subcategoria where IdSubcategoria = $id";

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
}
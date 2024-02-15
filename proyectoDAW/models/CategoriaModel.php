<?php
class CategoriaModel
{
  //Conectarse a la BD
  public $enlace;

  public function __construct()
  {
    $this->enlace = new MySqlConnect();
  }
  /**
   * Listar categorias
   * @param 
   * @return $vResultado - Lista de categorias
   */
  public function all()
  {
    try {
      //Consulta SQL
      $vSQL = "SELECT * FROM categoria;";
      //Ejecutar la consulta
      $vResultado = $this->enlace->ExecuteSQL($vSQL);
      //Retornar la respuesta

      return $vResultado;
    } catch (Exception $e) {
      die("" . $e->getMessage());
    }
  }
}
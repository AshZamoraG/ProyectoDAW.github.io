<?php

class ProductoModel
{
  public $enlace;
  public function __construct()
  {
    $this->enlace = new MySqlConnect();
  }
/**
     * Listar productos
     * @param 
     * @return $vResultado - Lista de produtos
     */
  public function all()
  {
    try {
      $vSQL = "SELECT * FROM producto;";
      $vResultado = $this->enlace->ExecuteSQL($vSQL);

      return $vResultado;

    } catch (Exception $e) {
      die("" . $e->getMessage());
    }
  }
  public function get($id)
  {
    try {
      $vSql = "SELECT * from producto where Id = $id";
      $subcategoriaM = new SubcategoriaModel();
      //Ejecutar la consulta sql
      $vResultado = $this->enlace->executeSQL($vSql);
      if (!empty($vResultado)) {
        //Obtener objeto
        $vResultado = $vResultado[0];

        $subcategoria = $subcategoriaM->get($vResultado->IdSubcategoria);


       $vResultado->IdSubcategoria = $subcategoria;

        
      }
      return $vResultado;
    } catch (Exception $e) {
      die($e->getMessage());
    }

  }
}

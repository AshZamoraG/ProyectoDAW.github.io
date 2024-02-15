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
      $subcategoriaM = new SubcategoriaModel();

      $vSql = "SELECT * from producto where idproducto = $id";

      //Ejecutar la consulta sql
      $vResultado = $this->enlace->executeSQL($vSql);
      if (!empty($vResultado)) {
        //Obtener objeto
        $vResultado = $vResultado[0];

        //---Director
        $subcategoria = $subcategoriaM->get($vResultado->IdSubcategoria);

        //Asignar director al objeto  
        $vResultado->IdSubcategoria = $subcategoria;

      }
      //Retornar la respuesta
      return $vResultado;
    } catch (Exception $e) {
      die($e->getMessage());
    }
  }
}

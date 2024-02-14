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
}

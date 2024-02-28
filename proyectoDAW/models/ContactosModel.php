<?php

class ContactosModel
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
      $vSQL = "SELECT * FROM contactos;";
      $vResultado = $this->enlace->ExecuteSQL($vSQL);

      return $vResultado;

    } catch (Exception $e) {
      die("" . $e->getMessage());
    }
  }
  public function get($id)
  {
    try {
      $vSql = "SELECT * from contactos where Id = $id";
      $proveedorM = new ProveedorModel();

      //Ejecutar la consulta sql
      $vResultado = $this->enlace->executeSQL($vSql);
      if (!empty($vResultado)) {
        //Obtener objeto
        $vResultado = $vResultado[0];

        $proveedor = $proveedorM->get($vResultado->IdProveedor);


       $vResultado->IdProveedor = $proveedor;

      }
      return $vResultado;
    } catch (Exception $e) {
      die($e->getMessage());
    }

  }
}

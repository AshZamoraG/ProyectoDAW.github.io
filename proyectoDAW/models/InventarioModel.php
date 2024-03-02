<?php
class InventarioModel
{

    //Conectarse a la BD
    public $enlace;

    public function __construct()
    {
        $this->enlace = new MySqlConnect();
    }

    /**
     * Listar Usuarios
     * @param 
     * @return $vResultado - Lista de objetos
     */
    public function all()
    {
        try {
            //Consulta SQL
            $vSQL = "SELECT * FROM inventario;";
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
      $vSql = "SELECT * from inventario where IdBodega = $id";

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
  public function getByUsuarioId($id)
  {
    try {
      $vSql = "SELECT 
      UsuarioXBodega.IdBodega,
      Bodega.Nombre AS NombreBodega,
      Producto.Nombre AS NombreProducto,
      Producto.Descripcion,
      Inventario.CantidadDisponible
  FROM 
      UsuarioXBodega
      JOIN Bodega ON UsuarioXBodega.IdBodega = Bodega.Id
      JOIN Inventario ON Bodega.Id = Inventario.IdBodega
      JOIN Producto ON Inventario.IdProducto = Producto.Id
  WHERE 
      UsuarioXBodega.IdUsuario = $id;";

      //Ejecutar la consulta sql
      $vResultado = $this->enlace->executeSQL($vSql);
      
      return $vResultado;
    } catch (Exception $e) {
      die($e->getMessage());
    }

  }
}

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

 /* Llamar producto (nombre y en que bodega esta)-inventario */
    public function get($id)
    {
      try {
        $vSql = "SELECT 
        inventario.Id AS IdInventario,
        bodega.Nombre AS NombreBodega,
        categoria.Nombre AS NombreCategoria,
        subcategoria.Nombre AS NombreSubcategoria,
        producto.Nombre AS NombreProducto,
        producto.Descripcion AS DescripcionProducto,
        producto.Marca AS MarcaProducto,
        producto.Talla AS TallaProducto,
        producto.CostoUnitario AS Costo_UnitarioProducto,
        producto.CantidadTotalEnStock AS CantidadTotalStock,
        producto.CodigoSKU AS CodigoSKUProducto,
        inventario.CantidadDisponible AS CantidadDisponible,
        usuario_reg.Nombre AS Nombre_UsuarioRegistro,
        usuario_act.Nombre AS Nombre_UsuarioActualizacion,
        inventario.FechaRegistro AS FechaRegistro,
        inventario.FechaActualizacion AS FechaActualizacion,
        inventario.CantidadMaxima AS CantidadMaxima,
        inventario.CantidadMinima AS CantidadMinima
        FROM inventario
        INNER JOIN bodega ON inventario.IdBodega = bodega.Id
        INNER JOIN producto ON inventario.IdProducto = producto.Id
        INNER JOIN usuario AS usuario_reg ON inventario.UsuarioRegistro = usuario_reg.Id
        INNER JOIN usuario AS usuario_act ON inventario.UsuarioActualizacion = usuario_act.Id
        INNER JOIN subcategoria ON producto.IdSubcategoria = subcategoria.Id
        INNER JOIN categoria ON subcategoria.IdCategoria = categoria.Id
        where inventario.id = $id;";
        //Ejecutar la consulta sql
        $vResultado = $this->enlace->executeSQL($vSql);
        if (!empty($vResultado)) {
          //Obtener objeto
          

        }
        return $vResultado[0];
      } catch (Exception $e) {
        die($e->getMessage());
      }
    }
    public function getByIdUsuario($id)
    {
      try {
        $vSql = " SELECT 
        inventario.Id as id,
        inventario.FechaActualizacion,
            inventario.FechaRegistro,
            usuarioXbodega.IdUsuario,
            bodega.Nombre AS NombreBodega,
            producto.Id AS IdProducto,
            producto.CodigoSKU AS SKUDelProducto,
            producto.Nombre AS NombreProducto,
            producto.Descripcion AS DescripcionProducto,
            subcategoria.Id AS IdSubcategoria,
            subcategoria.Nombre AS NombreSubcategoria,
            categoria.Id AS IdCategoria,
            categoria.Nombre AS NombreCategoria,
            usuario_registro.Id AS IdUsuarioRegistro,
            usuario_registro.Nombre AS NombreUsuarioRegistro,
            usuario_actualizacion.Id AS IdUsuarioActualizacion,
            usuario_actualizacion.Nombre AS NombreUsuarioActualizacion,
            inventario.CantidadDisponible,
            inventario.CantidadMaxima,
            inventario.CantidadMinima
            
        FROM inventario
        INNER JOIN bodega ON inventario.IdBodega = bodega.Id
        INNER JOIN ubicacion ON bodega.IdUbicacion = ubicacion.Id
        INNER JOIN producto ON inventario.IdProducto = producto.Id
        INNER JOIN subcategoria ON producto.IdSubcategoria = subcategoria.Id
        INNER JOIN categoria ON subcategoria.IdCategoria = categoria.Id
        INNER JOIN usuario AS usuario_registro ON inventario.UsuarioRegistro = usuario_registro.Id
        INNER JOIN usuario AS usuario_actualizacion ON inventario.UsuarioActualizacion = usuario_actualizacion.Id
        INNER JOIN usuarioXbodega ON usuarioXbodega.IdBodega = bodega.Id
        WHERE usuarioXbodega.IdUsuario = $id;
    ";
        //Ejecutar la consulta sql
        $vResultado = $this->enlace->executeSQL($vSql);
        if (!empty($vResultado)) {
          //Obtener objeto
          

        }
        return $vResultado;
      } catch (Exception $e) {
        die($e->getMessage());
      }
    }

}

<?php
class OrdenCompraModel
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
            $vSQL = "SELECT * FROM ordenCompra;";
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
        $vSql = "SELECT * from ordenCompra where Id = $id";
        $proveedorM = new ProveedorModel();
        $bodegaM = new BodegaModel();
        $usuarioM = new UsuarioModel();
        $productoM = new ProductoModel();
        
        //Ejecutar la consulta sql
        $vResultado = $this->enlace->executeSQL($vSql);
        if (!empty($vResultado)) {
          //Obtener objeto
          $vResultado = $vResultado[0];

          $usuario = $usuarioM->get($vResultado->UsuarioRegistro);
          $vResultado->UsuarioRegistro = $usuario;

          $producto = $productoM->get( $vResultado->IdProducto);
          $vResultado->IdProducto = $producto;

          $proveedor = $proveedorM->get( $vResultado->IdProveedor);
          $vResultado->IdProveedor = $proveedor;

          $bodega = $bodegaM->get( $vResultado->IdBodega);
          $vResultado->IdBodega= $bodega;


        }
        return $vResultado;
      } catch (Exception $e) {
        die($e->getMessage());
      }
    }

    public function getOrdenCompraById(){
      $vSql = "  SELECT 
      ordencompra.Id,
      ordencompra.FechaGeneracion,
      ordencompra.FechaRecepcion,
      producto.CodigoSKU AS CodigoProducto,
      producto.Nombre AS NombreProducto,
      proveedor.Id AS CodigoProveedor,
      proveedor.Nombre AS NombreProveedor,
      bodega.Id AS CodigoBodega,
      bodega.Nombre AS NombreBodega,
      usuario.Id AS CodigoUsuario,
      usuario.Nombre AS NombreUsuario
  FROM 
      ordencompra
  INNER JOIN 
      producto ON ordencompra.IdProducto = producto.Id
  INNER JOIN 
      proveedor ON ordencompra.IdProveedor = proveedor.Id
  INNER JOIN 
      bodega ON ordencompra.IdBodega = bodega.Id
  INNER JOIN 
      usuario ON ordencompra.UsuarioRegistro = usuario.Id
  WHERE
      ordencompra.Id = 3;";
       //Ejecutar la consulta sql
       $vResultado = $this->enlace->executeSQL($vSql);

      return $vResultado[0];
    }

    public function OrdenCompraFactura(){
        $vSql = " SELECT 
        ordencompra.Id AS OrdenCompraId,
        ordencompra.FechaGeneracion,
        ordencompra.FechaRecepcion,
        usuario.Id AS CodigoUsuario,
        usuario.Nombre AS NombreUsuario,
        producto.Id AS CodigoProducto,
        producto.CodigoSKU AS CodigoSKU,
        producto.Nombre AS NombreProducto,
        producto.Descripcion AS DescripcionProducto,
        proveedor.Id AS CodigoProveedor,
        proveedor.Nombre AS NombreProveedor,
        ordenXproducto.Cantidad,
        ordenXproducto.PrecioUnidad
    FROM 
        ordencompra
    INNER JOIN 
        ordenXproducto ON ordencompra.Id = ordenXproducto.IdOrdenCompra
    INNER JOIN 
        producto ON ordenXproducto.IdProducto = producto.Id
    INNER JOIN 
        proveedor ON ordencompra.IdProveedor = proveedor.Id
    INNER JOIN 
        usuario ON ordencompra.UsuarioRegistro = usuario.Id
        
    WHERE
        ordencompra.Id = 3;";
         //Ejecutar la consulta sql
         $vResultado = $this->enlace->executeSQL($vSql);
  
        return $vResultado[0];
      }
}

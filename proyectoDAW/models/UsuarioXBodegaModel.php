<?php
class UsuarioXBodegaModel
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
            $vSQL = "SELECT * FROM UsuarioXBodega;";
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
        $vSql = "SELECT * from UsuarioXBodega where IdUsuario = $id";
        $bodegaM = new BodegaModel();
        $usuarioM = new UsuarioModel();

        
        //Ejecutar la consulta sql
        $vResultado = $this->enlace->executeSQL($vSql);
        if (!empty($vResultado)) {
          //Obtener objeto
          $vResultado = $vResultado[0];

          $usuario = $usuarioM->get($vResultado->IdUsuario);
          $vResultado->UsuarioRegistro = $usuario;

          $bodega = $bodegaM->get( $vResultado->IdBodega);
          $vResultado->IdBodega= $bodega;


        }
        return $vResultado;
      } catch (Exception $e) {
        die($e->getMessage());
      }
    }

}

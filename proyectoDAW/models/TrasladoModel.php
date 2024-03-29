<?php
class TrasladoModel
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
            $vSQL = "SELECT * FROM traslado;";
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
        $vSql = "SELECT * from traslado where Id = $id";
        $bodegaM = new BodegaModel();
        $usuarioM = new UsuarioModel();
        //Ejecutar la consulta sql
        $vResultado = $this->enlace->executeSQL($vSql);
        if (!empty($vResultado)) {
          //Obtener objeto
          $vResultado = $vResultado[0];

          //Usuario registro
          $usuario = $usuarioM->get($vResultado->UsuarioRegistro);


          $vResultado->UsuarioRegistro = $usuario;

          //Bodega origen
          $bodega = $bodegaM->get($vResultado->BodegaOrigenID);


          $vResultado->BodegaOrigenID = $bodega;

           //Bodega destino
           $bodega = $bodegaM->get($vResultado->BodegaDestinoID);


           $vResultado->BodegaDestinoID = $bodega;


        }
        return $vResultado;
      } catch (Exception $e) {
        die($e->getMessage());
      }
  
    }

}

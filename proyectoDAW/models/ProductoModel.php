<?php

class ProductoModel
{
  public $enlace;
  public function __construct()
  {
    $this->enlace = new MySqlConnect();
  }

  public function all()
  {
    try 
    {
    $vSQL = "SELECT * FROM producto;";
    }
  }
}
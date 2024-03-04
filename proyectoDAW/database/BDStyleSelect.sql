-- Crear Base de Datos
CREATE DATABASE  BDStyleSelect;
USE BDStyleSelect;
 -- drop database BDStyleSelect

-- Crear Tablas
CREATE TABLE usuario (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Rol VARCHAR(50),
    Estado boolean
);
CREATE TABLE categoria (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(255)
);

CREATE TABLE subcategoria (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(255),
    IdCategoria INT, FOREIGN KEY (IdCategoria) REFERENCES Categoria(Id)
);
CREATE TABLE producto (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Descripcion longtext,
    Marca varchar(255),
    Talla varchar(255),
    CostoUnitario DECIMAL(10, 2),
    CantidadTotalEnStock INT,
    CodigoSKU VARCHAR(20),
    IdSubcategoria INT, FOREIGN KEY (IdSubcategoria) REFERENCES Subcategoria(Id)
);


-- Crear la tabla Ubicacion
CREATE TABLE ubicacion (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Provincia VARCHAR(255),
    Canton VARCHAR(255),
    Distrito VARCHAR(255),
    Direccion TEXT
);

-- Crear la tabla Bodega
CREATE TABLE bodega (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Dimensiones VARCHAR(50),
    Capacidad INT,
    TieneDetectoresHumo BOOLEAN,
    IdUbicacion INT, FOREIGN KEY (IdUbicacion) REFERENCES ubicacion(Id)
    -- IdUsuarioEncargado int, FOREIGN KEY (IdUsuarioEncargado) REFERENCES Usuario(IdUsuario)
   
    
);
-- Crear la tabla Inventario
CREATE TABLE inventario (
    IdBodega int, foreign key (IdBodega) references bodega(Id),
    IdProducto INT , foreign key (IdProducto) references producto(Id),
    primary key(IdBodega,IdProducto),
    CantidadDisponible INT,
    UsuarioRegistro INT,
    UsuarioActualizacion INT,
    FechaRegistro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FechaActualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CantidadMaxima int,
    CantidadMinima int

);

-- Crear la tabla Proveedor
CREATE TABLE proveedor (
    Id INT PRIMARY KEY,
    Nombre VARCHAR(255),
    Provincia VARCHAR(255),
    Canton VARCHAR(255),
    Distrito VARCHAR(255),
    Direccion TEXT
    
);
-- Crear tabla contactos
CREATE TABLE contactos (
    Id INT PRIMARY KEY AUTO_INCREMENT,
    IdProveedor INT,
    Nombre VARCHAR(255),
    CorreoElectronico VARCHAR(255),
    Telefono VARCHAR(20),  FOREIGN KEY (IdProveedor) REFERENCES proveedor(Id)
);

-- Crear la tabla OrdenCompra
CREATE TABLE ordencompra (
    Id INT PRIMARY KEY,
    FechaGeneracion DATE,
    FechaRecepcion DATE,
    UsuarioRegistro INT, foreign key (UsuarioRegistro) References usuario(Id),
	IdProducto INT, FOREIGN KEY (IdProducto) REFERENCES producto(Id),
    IdProveedor INT, FOREIGN KEY (IdProveedor) REFERENCES proveedor(Id),
    IdBodega int, FOREIGN KEY (IdBodega) REFERENCES bodega(Id)
     --   Cantidad INT,
     --   PrecioUnitario DECIMAL(10, 2),
);
 create table ordenXproducto(
	  IdOrdenCompra int , FOREIGN KEY (IdOrdenCompra) REFERENCES ordenCompra(Id),
	  IdProducto int , FOREIGN KEY (IdProducto) REFERENCES producto(Id),
      primary key (IdOrdenCompra,IdProducto),
	  Cantidad int,
	  PrecioUnidad DECIMAL(10, 2)
 );

-- Crear la tabla Traslado
CREATE TABLE traslado (
    Id INT PRIMARY KEY,
    FechaEnvio DATE,
    FechaRecibido DATE,
    UsuarioRegistro INT,
	-- ProductID INT, FOREIGN KEY (IdProducto) REFERENCES Producto(IdProducto),
    -- Cantidad INT,
    BodegaOrigenID INT, FOREIGN KEY (BodegaOrigenID) REFERENCES bodega(Id),
    BodegaDestinoID INT, FOREIGN KEY (BodegaDestinoID) REFERENCES bodega(Id)    
);
 create table trasladoXproducto(
	  IdTraslado int , FOREIGN KEY (IdTraslado) REFERENCES traslado(Id),
	  IdProducto int , FOREIGN KEY (IdProducto) REFERENCES producto(Id),
      primary key(IdTraslado,IdProducto),
	  Cantidad int 
 );
-- Crear la tabla SalidaInventario
CREATE TABLE salidaInventario (
    Id INT PRIMARY KEY,
    Fecha DATE,
    UsuarioRegistro INT,
    Observacion TEXT,
    BodegaID INT,
	-- ProductID INT, FOREIGN KEY (IdProducto) REFERENCES Producto(IdProducto),
    Cantidad INT,FOREIGN KEY (BodegaID) REFERENCES bodega(Id)
    
);
 create table salidaXproducto(
	  IdSalida int , FOREIGN KEY (IdSalida) REFERENCES salidaInventario(Id),
	  IdProducto int , FOREIGN KEY (IdProducto) REFERENCES producto(Id),
	  primary key (IdSalida,IdProducto),
      Cantidad int 
      
 );
 create table usuarioXbodega(
	IdUsuario int , foreign key (IdUsuario) references usuario(Id),
    IdBodega int, foreign key (IdBodega) references bodega(Id),
    primary key (IdUsuario, IdBodega)
);

-- --------------- INSERT ----------------------------------

-- Para la tabla Usuario
INSERT INTO usuario (Id, Nombre, Rol, Estado) VALUES
(1, 'Paul Herrera Porras', 'Administrador', 'Activo'),
(2, 'Ashly Zamora Gamboa', 'Administrador', 'Activo'),
(3, 'Ana López', 'Gerente', 'Activo'),
(4, 'Pedro Rodríguez', 'Gerente', 'Activo'),
(5, 'Luis Chavez', 'Gerente', 'Activo');
-- Para la tabla Categoria
INSERT INTO categoria (Id, Nombre) VALUES
(1, 'Ropa para Hombres'),
(2, 'Ropa para Mujeres'),
(3, 'Ropa para Niños'),
(4, 'Ropa Unisex/General');

-- Para la tabla Subcategoria
INSERT INTO subcategoria (Id, Nombre, IdCategoria) VALUES
(1, 'Camisas', 1),
(2, 'Vestidos', 2),
(3, 'Pantalones', 3),
(4, 'Ropa Deportiva ', 4);

-- Para la tabla Producto
INSERT INTO producto (Id, Nombre, Descripcion, Marca, Talla, CostoUnitario, CantidadTotalEnStock, CodigoSKU, IdSubcategoria) VALUES
(1, 'Camiseta de algodón', 'Camiseta cómoda para el día a día', ' H&M ', 'M', 15.99, 100, 'RPH_CAM_01', 1),
(3, 'Vestido de verano', 'Vestido fresco para el verano', 'Zara', 'M', 39.99, 80, 'RPM_VES_02', 2),
(2, 'Pantalón de mezclilla', 'Pantalón casual', ' H&M ', '32', 29.99, 50, 'RPN_PAM_03', 3),
(4, 'Pantaloneta de algodon', 'Pantaloneta comoda para una mayor movilidad', 'Nike', 'S', 24.99, 30, 'RUG_DEP_04', 4);

-- Para la tabla Ubicacion
INSERT INTO ubicacion (Id, Nombre, Provincia, Canton, Distrito, Direccion) VALUES
(1, 'Bodega 01', 'San José', 'Pérez Zeledón', 'Cajón', 'Avenida Principal #123'),
(2, 'Bodega 02', 'Heredia', ' Belén', 'San Antonio', 'Calle Secundaria #456'),
(3, 'Bodega 03', 'Alajuela', 'San Ramón', 'San Isidro', 'Calle #225');

-- Para la tabla Bodega
INSERT INTO bodega (Id, Nombre, Dimensiones, Capacidad, TieneDetectoresHumo, IdUbicacion) VALUES
(1, 'Bodega 01', '10x20m', 1000, true, 1),
(2, 'Bodega 02', '8x15m', 500, true, 2),
(3, 'Bodega 03', '10x15m', 500, true, 2);

-- Para la tabla Inventario
INSERT INTO inventario (IdBodega, IdProducto, CantidadDisponible, UsuarioRegistro, UsuarioActualizacion, CantidadMaxima, CantidadMinima) VALUES
(1, 1, 50, 1, 1, 200, 20),
(1, 2, 20, 1, 1, 100, 10),
(2, 3, 30, 2, 2, 150, 15),
(2, 4, 10, 2, 2, 80, 8);

-- Para la tabla Proveedor
INSERT INTO proveedor (Id, Nombre, Provincia, Canton, Distrito, Direccion) VALUES
(1, 'Proveedor A', 'San José', 'San José', 'San José', 'Calle Principal #789'),
(2, 'Proveedor B', 'Alajuela', 'Alajuela', 'Alajuela', 'Avenida Secundaria #321'),
(3, 'Proveedor C', 'Heredia', 'Heredia', 'Heredia', 'Avenida  #323');

-- Para la tabla Contactos
INSERT INTO contactos (Id, IdProveedor, Nombre, CorreoElectronico, Telefono) VALUES
(1, 1, 'Contacto 1', 'contacto1@proveedora.com', '12345678'),
(2, 3, 'Contacto 2', 'contacto2@proveedora.com', '87654321'),
(3, 2, 'Contacto 3', 'contacto3@proveedora.com', '98765432');

-- Para la tabla OrdenCompra
INSERT INTO ordencompra (Id, FechaGeneracion, FechaRecepcion, UsuarioRegistro, IdProducto, IdProveedor, IdBodega) VALUES
(1, '2024-02-01', '2024-02-05', 3, 1, 1, 1),
(2, '2024-02-02', '2024-02-06', 4, 2, 2, 2),
(3, '2024-02-02', '2024-02-06', 5, 4, 3, 3);

-- Para la tabla Traslado
INSERT INTO traslado (Id, FechaEnvio, FechaRecibido, UsuarioRegistro, BodegaOrigenID, BodegaDestinoID) VALUES
(1, '2024-02-10', '2024-02-12', 3, 1, 2),
(2, '2024-02-11', '2024-02-13', 4, 2, 3),
(3, '2024-02-11', '2024-02-13', 5, 3, 1);

-- Para la tabla SalidaInventario
INSERT INTO salidaInventario (Id, Fecha, UsuarioRegistro, Observacion, BodegaID, Cantidad) VALUES
(1, '2024-02-15', 3, 'Venta al cliente X', 1, 5),
(2, '2024-02-16', 4, 'Devolución de productos defectuosos', 2, 3),
(3, '2024-02-16', 5, 'Venta al cliente X', 3, 7);

-- Para la tabla UsuarioXBodega
INSERT INTO usuarioXbodega (IdUsuario, IdBodega) VALUES
(3, 1),
(4, 2),
(5, 3);

-- Para la tabla ordenxproducto
INSERT INTO ordenXproducto (IdOrdenCompra, IdProducto, Cantidad, PrecioUnidad) VALUES
(1, 1, 20, 15.99),
(2, 2, 10, 29.99),
(3, 3, 6, 39.99);

-- Para la tabla trasladoxproducto
INSERT INTO trasladoXproducto (IdTraslado, IdProducto, Cantidad) VALUES
(1, 2, 15),
(2, 4, 8),
(3, 3, 5);

-- Para la tabla salidaxproducto
INSERT INTO salidaXproducto (IdSalida, IdProducto, Cantidad) VALUES
(1, 2, 3),
(2, 3, 2),
(3, 4, 2);


-- **************************** GET TABLAS *******************************
-- GET UsuarioXBodega
SELECT 
    usuarioXbodega.IdUsuario,
    bodega.Nombre AS NombreBodega,
    producto.Nombre AS NombreProducto,
    producto.Descripcion,
    inventario.CantidadDisponible
FROM 
    usuarioXbodega
    JOIN bodega ON usuarioXbodega.IdBodega = bodega.Id
    JOIN inventario ON bodega.Id = inventario.IdBodega
    JOIN producto ON inventario.IdProducto = producto.Id
WHERE 
    usuarioXbodega.IdUsuario = 3;


-- GET OrdenXProducto

SELECT 
    ordencompra.Id,
    ordencompra.FechaGeneracion,
    proveedor.Nombre AS NombreProveedor,
    bodega.Nombre AS NombreBodega,
    ordencompra.FechaRecepcion,
    usuario.Nombre AS NombreUsuario,
    producto.Nombre AS NombreProducto,
    ordenXproducto.Cantidad,
    ordenXproducto.PrecioUnidad
FROM 
    ordencompra
    JOIN proveedor ON ordencompra.IdProveedor = proveedor.Id
    JOIN bodega ON ordencompra.IdBodega = bodega.Id
    JOIN usuario ON ordencompra.UsuarioRegistro = usuario.Id
    JOIN ordenXproducto ON ordencompra.Id = ordenXproducto.IdOrdenCompra
    JOIN producto ON ordenXproducto.IdProducto = Producto.Id
WHERE 
    ordencompra.Id = 1 
ORDER BY 
    ordenCompra.Id, ordenXproducto.IdProducto;




-- GET getProdcutoById
    
    SELECT 
    producto.Id,
    producto.Nombre AS NombreProducto,
    producto.Descripcion,
    producto.Marca,
    producto.Talla,
    producto.CostoUnitario,
    producto.CantidadTotalEnStock,
    producto.CodigoSKU,
    subcategoria.Nombre AS NombreSubcategoria,
    categoria.Nombre AS NombreCategoria
FROM 
    producto
INNER JOIN 
    subcategoria ON producto.IdSubcategoria = subcategoria.Id
INNER JOIN 
    categoria ON subcategoria.IdCategoria = categoria.Id
WHERE
    producto.Id = 2;
    
  -- GET getOrdenompraById 
    
    SELECT 
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
    ordencompra.Id = 3;














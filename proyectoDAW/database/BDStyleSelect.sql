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
	 Id INT AUTO_INCREMENT,
     UNIQUE(Id),
    IdBodega int, foreign key (IdBodega) references bodega(Id),
    IdProducto INT , foreign key (IdProducto) references producto(Id),
    primary key(IdBodega,IdProducto),
    CantidadDisponible INT,
    UsuarioRegistro INT ,foreign key (UsuarioRegistro) references usuario(Id),
    UsuarioActualizacion INT,foreign key (UsuarioActualizacion) references usuario(Id),
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
(2, 3, 30, 2, 3, 150, 15),
(2, 4, 10, 1, 2, 80, 8);



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
INSERT INTO ordencompra (Id, FechaGeneracion, FechaRecepcion, UsuarioRegistro,  IdProveedor, IdBodega) VALUES
(1, '2024-02-01', '2024-02-05', 3,  1, 1),
(2, '2024-02-02', '2024-02-06', 4,  2, 2),
(3, '2024-02-02', '2024-02-06', 5,  3, 3);

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
    ordenXproducto ON ordencompra.Id = ordenXproducto.IdOrdenCompra
INNER JOIN 
    producto ON ordenXproducto.IdProducto = producto.Id
INNER JOIN 
    proveedor ON ordencompra.IdProveedor = proveedor.Id
INNER JOIN 
    bodega ON ordencompra.IdBodega = bodega.Id
INNER JOIN 
    usuario ON ordencompra.UsuarioRegistro = usuario.Id
WHERE
    ordencompra.Id = 3;


  -- GET OrdenCompraFactura 

    
    SELECT 
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
    ordencompra.Id = 3;

-- GET InventarioByIdUsuario

SELECT 

    bodega.Id AS IdBodega,
    ubicacion.Nombre AS UbicacionBodega,
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
    inventario.CantidadDisponible
FROM 
    inventario
INNER JOIN 
    bodega ON inventario.IdBodega = bodega.Id
INNER JOIN 
    ubicacion ON bodega.IdUbicacion = ubicacion.Id
INNER JOIN 
    producto ON inventario.IdProducto = producto.Id
INNER JOIN 
    subcategoria ON producto.IdSubcategoria = subcategoria.Id
INNER JOIN 
    categoria ON subcategoria.IdCategoria = categoria.Id
INNER JOIN 
    usuario AS usuario_registro ON inventario.UsuarioRegistro = usuario_registro.Id
INNER JOIN 
    usuario AS usuario_actualizacion ON inventario.UsuarioActualizacion = usuario_actualizacion.Id
WHERE 
    usuario_registro.Id = 1;

-- GET InventarioById

SELECT 
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
FROM 
    inventario
INNER JOIN 
    bodega ON inventario.IdBodega = bodega.Id
INNER JOIN 
    ubicacion ON bodega.IdUbicacion = ubicacion.Id
INNER JOIN 
    producto ON inventario.IdProducto = producto.Id
INNER JOIN 
    subcategoria ON producto.IdSubcategoria = subcategoria.Id
INNER JOIN 
    categoria ON subcategoria.IdCategoria = categoria.Id
INNER JOIN 
    usuario AS usuario_registro ON inventario.UsuarioRegistro = usuario_registro.Id
INNER JOIN 
    usuario AS usuario_actualizacion ON inventario.UsuarioActualizacion = usuario_actualizacion.Id
INNER JOIN 
    usuarioXbodega ON usuarioXbodega.IdBodega = bodega.Id
WHERE 
    usuarioXbodega.IdUsuario = 3;


-- Inserts para la tabla Usuario
INSERT INTO usuario (Id, Nombre, Rol, Estado) VALUES
(6, 'María Fernanda', 'Vendedor', 'Activo'),
(7, 'Juan Pérez', 'Almacenero', 'Activo'),
(8, 'Ana Martínez', 'Gerente de Ventas', 'Activo'),
(9, 'Carlos Sánchez', 'Supervisor', 'Activo');

-- Inserts para la tabla Categoria
INSERT INTO categoria (Id, Nombre) VALUES
(5, 'Ropa Interior'),
(6, 'Accesorios'),
(7, 'Calzado'),
(8, 'Artículos de Hogar');

-- Inserts para la tabla Subcategoria
INSERT INTO subcategoria (Id, Nombre, IdCategoria) VALUES
(5, 'Sujetadores', 5),
(6, 'Bisutería', 6),
(7, 'Zapatos Deportivos', 7),
(8, 'Cortinas', 8);

-- Inserts para la tabla Producto
INSERT INTO producto (Id, Nombre, Descripcion, Marca, Talla, CostoUnitario, CantidadTotalEnStock, CodigoSKU, IdSubcategoria) VALUES
(5, 'Sujetador de Encaje', 'Sujetador elegante y cómodo', 'Victoria Secret', 'M', 25.99, 50, 'ROP_INT_001', 5),
(6, 'Collar de Plata', 'Collar fino y delicado', 'Tiffany & Co.', 'Única', 99.99, 30, 'ACC_002', 6),
(7, 'Zapatillas Nike Air Max', 'Zapatillas cómodas para correr', 'Nike', '42', 129.99, 20, 'CAL_003', 7),
(8, 'Cortina Estampada', 'Cortina decorativa para el hogar', 'IKEA', 'Única', 39.99, 40, 'ART_HOG_004', 8);

-- Inserts para la tabla Ubicacion
INSERT INTO ubicacion (Id, Nombre, Provincia, Canton, Distrito, Direccion) VALUES
(4, 'Bodega 04', 'Guanacaste', 'Liberia', 'Barrio Corazón de Jesús', 'Calle Principal #789'),
(5, 'Bodega 05', 'Limón', 'Limón', 'Barrio Limoncito', 'Avenida Central #123'),
(6, 'Bodega 06', 'Cartago', 'Cartago', 'Barrio San Rafael', 'Avenida Norte #456'),
(7, 'Bodega 07', 'Puntarenas', 'Puntarenas', 'Barrio Puntarenas', 'Calle Secundaria #321');

-- Inserts para la tabla Bodega
INSERT INTO bodega (Id, Nombre, Dimensiones, Capacidad, TieneDetectoresHumo, IdUbicacion) VALUES
(4, 'Bodega 04', '12x18m', 800, true, 4),
(5, 'Bodega 05', '10x20m', 1000, true, 5),
(6, 'Bodega 06', '15x15m', 750, false, 6),
(7, 'Bodega 07', '8x10m', 500, false, 7);

-- Inserts para la tabla Inventario
INSERT INTO inventario (IdBodega, IdProducto, CantidadDisponible, UsuarioRegistro, UsuarioActualizacion, CantidadMaxima, CantidadMinima) VALUES
(4, 5, 20, 6, 6, 100, 10),
(5, 6, 15, 7, 7, 80, 8),
(6, 7, 10, 8, 8, 50, 5),
(7, 8, 25, 9, 9, 120, 15);

-- Inserts para la tabla Proveedor
INSERT INTO proveedor (Id, Nombre, Provincia, Canton, Distrito, Direccion) VALUES
(4, 'Proveedor D', 'Heredia', 'Heredia', 'San Francisco', 'Calle Principal #111'),
(5, 'Proveedor E', 'Puntarenas', 'Puntarenas', 'El Roble', 'Avenida Central #222'),
(6, 'Proveedor F', 'Limón', 'Limón', 'Calle Limoncito', 'Calle Norte #333'),
(7, 'Proveedor G', 'Guanacaste', 'Liberia', 'Barrio Liberia', 'Calle Sur #444');

-- Inserts para la tabla Contactos
INSERT INTO contactos (Id, IdProveedor, Nombre, CorreoElectronico, Telefono) VALUES
(4, 4, 'Contacto 4', 'contacto4@proveedor.com', '11111111'),
(5, 5, 'Contacto 5', 'contacto5@proveedor.com', '22222222'),
(6, 6, 'Contacto 6', 'contacto6@proveedor.com', '33333333'),
(7, 7, 'Contacto 7', 'contacto7@proveedor.com', '44444444');

-- Inserts para la tabla OrdenCompra
INSERT INTO ordencompra (Id, FechaGeneracion, FechaRecepcion, UsuarioRegistro, IdProveedor, IdBodega) VALUES
(4, '2024-03-01', '2024-03-05', 6, 4, 4),
(5, '2024-03-02', '2024-03-06', 7, 5, 5),
(6, '2024-03-02', '2024-03-06', 8, 6, 6),
(7, '2024-03-03', '2024-03-07', 9, 7, 7);

-- Inserts para la tabla Traslado
INSERT INTO traslado (Id, FechaEnvio, FechaRecibido, UsuarioRegistro, BodegaOrigenID, BodegaDestinoID) VALUES
(4, '2024-03-10', '2024-03-12', 6, 4, 5),
(5, '2024-03-11', '2024-03-13', 7, 5, 6),
(6, '2024-03-11', '2024-03-13', 8, 6, 7),
(7, '2024-03-12', '2024-03-14', 9, 7, 4);

-- Inserts para la tabla SalidaInventario
INSERT INTO salidaInventario (Id, Fecha, UsuarioRegistro, Observacion, BodegaID, Cantidad) VALUES
(4, '2024-03-15', 6, 'Venta al cliente Y', 4, 7),
(5, '2024-03-16', 7, 'Devolución de productos defectuosos', 5, 5),
(6, '2024-03-16', 8, 'Venta al cliente Z', 6, 10),
(7, '2024-03-17', 9, 'Venta al cliente X', 7, 15);

-- Inserts para la tabla usuarioXbodega
INSERT INTO usuarioXbodega (IdUsuario, IdBodega) VALUES
(6, 4),
(7, 5),
(8, 6),
(9, 7);

-- Inserts para la tabla ordenxproducto
INSERT INTO ordenXproducto (IdOrdenCompra, IdProducto, Cantidad, PrecioUnidad) VALUES
(4, 5, 10, 25.99),
(5, 6, 8, 99.99),
(6, 7, 5, 129.99),
(7, 8, 12, 39.99);

-- Inserts para la tabla trasladoxproducto
INSERT INTO trasladoXproducto (IdTraslado, IdProducto, Cantidad) VALUES
(4, 6, 8),
(5, 7, 5),
(6, 8, 10),
(7, 5, 7);

-- Inserts para la tabla salidaxproducto
INSERT INTO salidaXproducto (IdSalida, IdProducto, Cantidad) VALUES
(4, 5, 7),
(5, 6, 5),
(6, 7, 10),
(7, 8, 15);


-- Inserts adicionales para la tabla usuarioXbodega para agregar más usuarios a cada bodega
INSERT INTO usuarioXbodega (IdUsuario, IdBodega) VALUES
(1, 5), -- Usuario 1 en Bodega 5
(2, 6), -- Usuario 2 en Bodega 6
(3, 7), -- Usuario 3 en Bodega 7
(4, 4), -- Usuario 4 en Bodega 4
(5, 5), -- Usuario 5 en Bodega 5
(1, 6), -- Usuario 1 en Bodega 6
(2, 7), -- Usuario 2 en Bodega 7
(3, 4), -- Usuario 3 en Bodega 4
(4, 5), -- Usuario 4 en Bodega 5
(5, 6); -- Usuario 5 en Bodega 6







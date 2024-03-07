import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Paper } from '@mui/material';
import OrdenCompraService from '../../services/OrdenCompraService';

export function DetailOrdenCompra() {
  const routeParams = useParams();
  console.log(routeParams);

  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState('');
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    //Llamar al API y obtener una pelicula
    OrdenCompraService.OrdenCompraFactura(routeParams.Id)
      .then((response) => {
        setData(response.data.results);
        console.log(response.data);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        throw new Error('Respuesta no válida del servidor');
      });
  }, [routeParams.id]);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <Container component="main" sx={{ mt: 8, mb: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Factura
      </Typography>
      <Paper
        elevation={3}
        sx={{ padding: 5, backgroundColor: 'white', color: 'black', }}
      >
        <Grid item={true} xs={4} spacing={2} >
          
          <Typography variant="subtitle1" display='block'>
            <strong>Orden de Compra:</strong> N°{data.OrdenCompraId}
          </Typography>
          <Typography variant="subtitle1"  display='block'>
            <strong>Fecha de Generación:</strong> {data.FechaGeneracion}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Fecha de Recepción:</strong> {data.FechaRecepcion}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Usuario:</strong> {data.CodigoUsuario} -{' '}
            {data.NombreUsuario}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Producto:</strong> {data.CodigoProducto} -{' '}
            {data.NombreProducto}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>SKU:</strong> {data.CodigoSKU}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Descripción:</strong> {data.DescripcionProducto}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Proveedor:</strong> {data.CodigoProveedor} -{' '}
            {data.NombreProveedor}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Cantidad:</strong> {data.Cantidad}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Precio Unitario:</strong> {data.PrecioUnidad}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Total:</strong> {data.PrecioUnidad * data.Cantidad}
          </Typography>
      </Grid>
      </Paper>
    </Container>
  );
}

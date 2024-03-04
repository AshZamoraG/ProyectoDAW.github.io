import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid} from '@mui/material';
import OrdenCompraService from '../../services/OrdenCompraService';

export function DetailOrdenCompra() {
  const routeParams= useParams();
  console.log(routeParams)

   //Resultado de consumo del API, respuesta
 const[data,setData]=useState(null);
 //Error del API
 const[error,setError]=useState('');
 //Booleano para establecer sí se ha recibido respuesta
 const[loaded,setLoaded]=useState(false);
   useEffect(()=>{
    //Llamar al API y obtener una pelicula
    OrdenCompraService.OrdenCompraFactura(routeParams.Id)
    .then( response=>{
      setData(response.data.results)
      console.log(response.data)
      setError(response.error)
      setLoaded(true)
    }
    ).catch( error=>{
      console.log(error)
      setError(error)
      throw new Error("Respuesta no válida del servidor")
    }      
    )
  },[routeParams.Id]) 

  if(!loaded) return <p>Cargando...</p>
  if(error) return <p>Error: {error.message}</p>
  return (
    <Container component='main' sx={{ mt: 8, mb: 2 }}>
      <Typography variant='h4' component='h1' gutterBottom>
        Factura
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              Orden de Compra: N°{data.OrdenCompraId}
            </Box>
          </Typography>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              Fecha de Generación: {data.FechaGeneracion}
            </Box>
          </Typography>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              Fecha de Recepción: {data.FechaRecepcion}
            </Box>
          </Typography>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              Usuario: {data.CodigoUsuario} - {data.NombreUsuario}
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              Producto: {data.CodigoProducto} - {data.NombreProducto}
            </Box>
          </Typography>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              SKU: {data.CodigoSKU}
            </Box>
          </Typography>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              Descripción: {data.DescripcionProducto}
            </Box>
          </Typography>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              Proveedor: {data.CodigoProveedor} - {data.NombreProveedor}
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              Cantidad: {data.Cantidad}
            </Box>
          </Typography>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              Precio Unitario: {data.PrecioUnidad}
            </Box>
          </Typography>
          <Typography component='span' variant='subtitle1' display='block'>
            <Box fontWeight='bold' display='inline'>
              Total: {data.PrecioUnidad * data.Cantidad}  
            </Box>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

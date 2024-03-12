import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Grid } from '@mui/material';
import ProductoService from '../../services/ProductoService';
import ReportViewer from './ReportViewer';

export function DetailProducto() {
  const routeParams = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ProductoService.getProductoById(routeParams.Id)
      .then(response => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch(error => {
        setError(error);
        throw new Error("Respuesta no válida del servidor");
      });
  }, [routeParams.Id]);



  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container id="detail-producto-container" component='main' sx={{ mt: 8, mb: 2 }}>
      
      {data && (
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Box component='img'
              sx={{
                borderRadius: '4%',
                maxWidth: '100%',
                height: 'auto',
              }}
            />
            <p>Imagen cargando...........De verdad esta cargando......</p>
            <p>Profe enserio creame...........aun carga......</p>
            <p>Fuente...........creanme......Error de carga </p>
          </Grid>
          <Grid item xs={7}>
            <Typography variant='h4' component='h2' gutterBottom>
              {data.Nombre}
            </Typography>
            <Typography variant='subtitle1' component='h1' gutterBottom>
              <Box fontWeight='bold' display='inline'></Box>{' '}{data.Descripcion}
            </Typography>
            <hr/>
            <Typography variant='subtitle1' component='h1' gutterBottom>
              <Box fontWeight='bold' display='inline'>Código:</Box>{' '}{data.CodigoSKU}
            </Typography>
            <Typography component='span' variant='subtitle1' display='block'>
              <Box fontWeight='bold' display='inline'>Talla: {data.Talla}</Box>{' '}
            </Typography>
            <Typography component='span' variant='subtitle1' display='block'>
              <Box fontWeight='bold' display='inline'>Marca:</Box>{' '}{data.Marca}
            </Typography>
            <Typography component='span' variant='subtitle1'>
              <Box fontWeight='bold' display='inline'>Categoría:</Box>{data.NombreCategoria}
            </Typography>
            <Typography component='span' variant='subtitle1' display='block'>
              <Box fontWeight='bold' display='inline'>Subcategoría:</Box>{data.NombreSubcategoria}
            </Typography>
            <Typography component='span' variant='subtitle1' display='block'>
              <Box fontWeight='bold' display='inline'>Costo por Unidad:</Box>{' '}{data.CostoUnitario}
            </Typography>
            <Typography component='span' variant='subtitle1' display='block'>
              <Box fontWeight='bold' display='inline'>Cantidad total en Stock:</Box>{' '}{data.CantidadTotalEnStock}
            </Typography>
          </Grid>
        </Grid>
      )}
<ReportViewer data={data} />  
    </Container>
  );
}

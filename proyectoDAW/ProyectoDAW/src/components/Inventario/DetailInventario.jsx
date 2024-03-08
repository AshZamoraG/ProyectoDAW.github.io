import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import InventarioService from '../../services/InventarioService';


export function DetailInventario() {
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
    InventarioService.InventarioById(routeParams.id)
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
    <Container component='main' sx={{ mt: 8, mb: 2 }} >
      {data && ( 
        <Grid container spacing={2}>
          
          <Grid item={true} xs={5} >  
          <Box component='img'
           sx={{
            borderRadius:'4%',
            maxWidth:'100%',
            height: 'auto',
          }}
          /> 
            
          </Grid>
          <Grid item={true} xs={7}>            
              <Typography variant='h4' component='h1' gutterBottom>
               {data.NombreBodega}
              </Typography>
              <hr/>
              
              <Typography variant='h5' component='h1' gutterBottom>
               Producto
              </Typography>
              
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                Nombre:
                </Box>{' '}
                   {data.NombreProducto}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                Código :
                </Box>{' '}
                   {data.CodigoSKUProducto}
              </Typography>
              
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                 Marca :
                </Box>{' '}
                   {data.MarcaProducto}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                 Talla:
                </Box>{' '}
                   {data.TallaProducto}
              </Typography>
              
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                 Categoría:
                </Box>{' '}
                   {data.NombreCategoria}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                 Subcategoría:
                </Box>{' '}
                   {data.NombreSubcategoria}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                Costo Unitario:
                </Box>{' '}
                   {data.Costo_UnitarioProducto}
              </Typography>
              <hr />
              
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                Cantidad Total en Stock:
                </Box>{' '}
                   {data.CantidadTotalStock}
              </Typography>
              
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                Cantidad Máxima:
                </Box>{' '}
                   {data.CantidadMaxima}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                Cantidad Mínima:
                </Box>{' '}
                   {data.CantidadMinima}
              </Typography>
              <hr />
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                Fecha de Actualización:
                </Box>{' '}
                   {data.FechaActualizacion}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                Fecha de Registro:
                </Box>{' '}
                   {data.FechaRegistro}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                 Usuario de Actualización:
                </Box>{' '}
                   {data.Nombre_UsuarioActualizacion}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                 Usuario de Registro:
                </Box>{' '}
                   {data.Nombre_UsuarioRegistro}
              </Typography>
              <hr />
             
              
        </Grid>
      </Grid>
   )}
  </Container>
);
}
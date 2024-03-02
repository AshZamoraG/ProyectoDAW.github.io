import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Grid } from '@mui/material';
import ProductoService from '../../services/ProductoService';

export function DetailProducto() {
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
    ProductoService.ProductoById(routeParams.Id)
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
          alt="Ticket pelicula"
          src={"ticket"}/> 
            
          </Grid>
          <Grid item={true} xs={7}>            
              <Typography variant='h4' component='h1' gutterBottom>
               {data.Nombre}
              </Typography>
              <Typography variant='subtitle1' component='h1' gutterBottom>
               {data.Descripcion}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Talla: {data.Talla}
                </Box>{' '}
                 
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Marca:
                </Box>{' '} {data.Marca}
                
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Costo por Unidad:
                </Box>{' '}
                   {data.CostoUnitario}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Cantidad total en Stock:
                </Box>{' '}
                   {data.CantidadTotalEnStock}
              </Typography>
             
              
        </Grid>
      </Grid>
   )}
  </Container>
);
}

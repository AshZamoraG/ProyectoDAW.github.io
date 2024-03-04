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
    OrdenCompraService.getOrdenCompraById(routeParams.Id)
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
               Orden Compra: N°{data.Id}
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                  Fecha de Generacion: {data.FechaGeneracion}
                </Box>{' '}
                 
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                    Fecha en la que se Resivio: {data.FechaRecepcion}
                </Box>{' '} 
                
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold'>
                 Usuario que Registro:
                </Box>{' '}
                <Box display='block' >
                  Código Usuario:{data.CodigoUsuario}
                </Box>{' '}
                <Box display='block'>
                   Nombre Usuario:{data.NombreUsuario}
                </Box>{' '}
                   
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' >
                  Producto:
                </Box>{' '}
                <Box display='block' >
                  Código Producto:{data.CodigoProducto}
                </Box>{' '}
                <Box display='block'>
                   Nombre Producto:{data.NombreProducto}
                </Box>{' '}
                  
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                 Proveeedor:
                </Box>{' '}
                <Box display='block' >
                  Código Proveeedor:{data.CodigoProveedor}
                </Box>{' '}
                <Box display='block'>
                   Nombre Proveeedor:{data.NombreProveedor}
                </Box>{' '}
                 
              </Typography>
              <Typography component='span' variant='subtitle1' display='block'>
                <Box fontWeight='bold' display='inline'>
                   Bodega:
                </Box>{' '}
                <Box display='block' >
                  Código Bodega:{data.CodigoBodega}
                </Box>{' '}
                <Box display='block'>
                   Nombre Bodega:{data.NombreBodega}
                </Box>{' '}
                 
           
              </Typography>
             
              
        </Grid>
      </Grid>
   )}
  </Container>
);
}
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskIcon from '@mui/icons-material/Task';
import OrdenCompraService from '../../services/OrdenCompraService';

export function ListOrdenCompra() {
  
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState('');
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    OrdenCompraService.getOrdenCompra()
      .then((response) => {
        if (response.data) {
          setData(response.data.results);
        }
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setLoaded(false);
        setError('Respuesta no válida del servidor');
      });
  }, []);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <Grid container style={{ padding: 2 }} spacing={3}>
      {data && data.map((item)=>(  
        <Grid item xs={4} key={item.Id} >
        <Card>
          <CardHeader
            sx={{
              p: 0,
              backgroundColor: (theme) => theme.palette.secondary.main,
              color: (theme) => theme.palette.common.white,
            }}
            style={{ textAlign: 'center' }}
            title=  {"Número de Compra:  N°" + item.Id} 
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <CalendarMonthIcon /> Fecha en que se Genero: {item.FechaGeneracion}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <CalendarMonthIcon /> Fecha en la que se Resivio: {item.FechaRecepcion}  
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{
              backgroundColor: (theme) => theme.palette.action.focus,
              color: (theme) => theme.palette.common.white,
            }}
          >
            <IconButton
              component={Link}
              to={`/ordenCompra/${item.Id}`}
              aria-label="Detalle"
              sx={{ ml: 'auto' }}
              
            >
              <TaskIcon />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
     ))}
    </Grid>
  );
}

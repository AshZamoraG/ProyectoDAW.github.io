import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Info } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import InsightsIcon from '@mui/icons-material/Insights';
import InventoryIcon from '@mui/icons-material/Inventory';
import ProductoService from '../../services/ProductoService';

export function ListProducto() {
  
  //Resultado de consumo del API, respuesta
  const [data, setData] = useState(null);
  //Error del API
  const [error, setError] = useState('');
  //Booleano para establecer sí se ha recibido respuesta
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    ProductoService.getProducto()
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
            title={item.Nombre}
            subheader={item.Descripcion}
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <CheckroomIcon /> {item.Talla}Talla
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <InsightsIcon />{item.Marca}  Marca

            </Typography>
            <Typography variant="body2" color="text.secondary">
              <InventoryIcon />{item.CantidadTotalEnStock} Stock
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
              to={`/producto/${item.Id}`}
              aria-label="Detalle"
              sx={{ ml: 'auto' }}
            >
              <Info />
            </IconButton>
          </CardActions>
        </Card>
      </Grid>
     ))}
    </Grid>
  );
}

import React, { useEffect, useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Typography, CardActions, IconButton, Button } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import TaskIcon from '@mui/icons-material/Task';
import { Link } from 'react-router-dom';
import OrdenCompraService from '../../services/OrdenCompraService';

export function ListOrdenCompra() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Grid container style={{ padding: 2 }} spacing={3}>
        {currentItems.map((item) => (
          <Grid item xs={6} key={item.Id}>
            <Card sx={{
              backgroundColor: '#f5f5f5',
              transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
              }
            }}>
              <CardHeader
                sx={{
                  p: 0,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white,
                }}
                style={{ textAlign: 'center' }}
                title={"Número de Compra:  N°" + item.Id}
              />
              <CardContent>
              
              <Typography variant="body2" color="text.secondary">
                  <CalendarMonthIcon /> Id del usuario que registró: {item.UsuarioRegistro}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <CalendarMonthIcon /> Fecha en que se Generó: {item.FechaGeneracion}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <CalendarMonthIcon /> Fecha en la que se Recibió: {item.FechaRecepcion}
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
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button key={index} onClick={() => paginate(index + 1)} style={{ margin: '0 5px' }}>
            {index + 1}
          </Button>
        ))}
      </div>
    </>
  );
}

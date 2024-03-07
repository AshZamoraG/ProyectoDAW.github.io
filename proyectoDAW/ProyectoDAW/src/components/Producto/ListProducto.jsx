import React, { useEffect, useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Typography, CardActions, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info'; 
import CheckroomIcon from '@mui/icons-material/Checkroom';
import InsightsIcon from '@mui/icons-material/Insights'; 
import InventoryIcon from '@mui/icons-material/Inventory'; 
import ProductoService from '../../services/ProductoService'; 

export function ListProducto() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

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
          <Grid item xs={6} sm={6} md={6} lg={6} key={item.Id}> 
            <Card sx={{ 
        backgroundColor: '#f5f5f5', 
        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', 
        '&:hover': {
          transform: 'scale(1.05)', 
        }
      }}
      >
              <CardHeader  sx={{
                  p: 0,
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  color: (theme) => theme.palette.common.white,
                }}
                
                title={item.Nombre}
                subheader={item.Descripcion}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  <CheckroomIcon /> {item.Talla} Talla
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <InsightsIcon /> {item.Marca} Marca
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <InventoryIcon /> {item.CantidadTotalEnStock} Stock
                </Typography>
              </CardContent>
              <CardActions>
                <IconButton
                  component={Link}
                  to={`/producto/${item.Id}`}
                  aria-label="Detalle"
                >
                  <InfoIcon />
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

import React, { useEffect, useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Typography, CardActions, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info'; // Corrected import for InfoIcon
import CheckroomIcon from '@mui/icons-material/Checkroom'; // Ensure this is the correct import
import InsightsIcon from '@mui/icons-material/Insights'; // Ensure this is the correct import
import InventoryIcon from '@mui/icons-material/Inventory'; // Ensure this is the correct import
import ProductoService from '../../services/ProductoService'; // Ensure the path is correct

export function ListProducto() {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Adjust this to change the number of items per page

  useEffect(() => {
    ProductoService.getProducto() // Ensure this function exists and is correctly imported
      .then((response) => {
        if (response.data) {
          setData(response.data.results); // Ensure response structure is correct
        }
        setLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setLoaded(false);
        setError('Respuesta no válida del servidor');
      });
  }, []);

  // Calculate the current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Grid container style={{ padding: 2 }} spacing={3}>
        {currentItems.map((item) => (
          <Grid item xs={6} sm={6} md={6} lg={6} key={item.Id}> {/* Adjusted for 2 by 2 layout */}
            <Card sx={{ 
        backgroundColor: '#f5f5f5', // Light grey background
        transition: 'transform 0.3s ease-in-out, background-color 0.3s ease-in-out', // Smooth transition for transform and background-color
        '&:hover': {
          transform: 'scale(1.05)', // Slightly grow the card size
          // Slightly darker color on hover
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

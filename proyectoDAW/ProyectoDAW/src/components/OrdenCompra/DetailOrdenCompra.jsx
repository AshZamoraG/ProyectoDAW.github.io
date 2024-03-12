import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import OrdenCompraService from '../../services/OrdenCompraService';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function DetailOrdenCompra() {
  const routeParams = useParams();
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    OrdenCompraService.OrdenCompraFactura(routeParams.Id)
      .then((response) => {
        setData(response.data.results);
        setError(response.error);
        setLoaded(true);
      })
      .catch((error) => {
        setError(error);
        throw new Error('Respuesta no válida del servidor');
      });
  }, [routeParams.id]);

  function generatePDF() {
    const input = document.getElementById('pdf-content');
  
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
  
      let position = 0;
  
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
  
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
  
      pdf.save('report.pdf');
    });
  }

  if (!loaded) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Container id="pdf-content" component="main" sx={{ mt: 8, mb: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Orden de Compra:
      </Typography>
      <Paper elevation={3} sx={{ padding: 5, backgroundColor: 'white', color: 'black' }}>
        <Grid item xs={4} spacing={2}>
          <Typography variant="subtitle1" display='block'>
            <strong></strong> N°{data.OrdenCompraId}
          </Typography>
          <hr />
          <Typography variant="subtitle1" display='block'>
            <strong>Producto:</strong>  {' '}
            {data.NombreProducto}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>SKU:</strong> {data.CodigoSKU}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Descripción:</strong> {data.DescripcionProducto}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Cantidad:</strong> {data.Cantidad}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Precio Unitario:</strong> {data.PrecioUnidad}
          </Typography>
          <hr />


          <Typography variant="subtitle1" display='block'>
            <strong>Proveedor:</strong> {data.CodigoProveedor}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Nombre:</strong>
            {data.NombreProveedor}
          </Typography>
          <hr />

          <Typography variant="subtitle1" display='block'>
            <strong>Usuario:</strong> {data.CodigoUsuario} -{' '}
            {data.NombreUsuario}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Fecha de Generación:</strong> {data.FechaGeneracion}
          </Typography>
          <Typography variant="subtitle1" display='block'>
            <strong>Fecha de Recepción:</strong> {data.FechaRecepcion}
          </Typography>
          <hr />

          <Typography variant="subtitle1" display='block'>
            <strong>Total:</strong> {data.PrecioUnidad * data.Cantidad}
          </Typography>

        </Grid>
      </Paper>
      <br /><br />
      <Button variant="contained" color="primary" onClick={generatePDF}>
        Generar PDF
      </Button>
    </Container>
  );
}

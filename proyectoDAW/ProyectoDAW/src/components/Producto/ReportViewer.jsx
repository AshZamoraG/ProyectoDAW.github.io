// ReportViewer.jsx

import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import PDFReport from './PDFReport';

const ReportViewer = ({ data }) => {
  const generatePDF = () => {
    const pdfData = {
      
      Nombre: data.Nombre,
      Descripcion: data.Descripcion,
      CodigoSKU: data.CodigoSKU,
      Talla: data.Talla,
      Marca: data.Marca,
      NombreCategoria: data.NombreCategoria,
      NombreSubcategoria: data.NombreSubcategoria,
      CostoUnitario: data.CostoUnitario,
      CantidadTotalEnStock: data.CantidadTotalEnStock,
    };

    const pdfBlob = PDFReport(pdfData).toBlob();
    const url = URL.createObjectURL(pdfBlob);
    window.open(url);
  };

  return (
    <div>
    <br /><br /><br />
      <PDFViewer style={{ width: '80%', height: '50vh' }}>
        <PDFReport data={data} />
      </PDFViewer>
      <br /><br /><br />
    </div>
  );
};

export default ReportViewer;
// PDFReport.jsx

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 8,
    textDecoration: 'underline',
  },
  text: {
    fontSize: 12,
    marginBottom: 6,
  },
  separator: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

const PDFReport = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>StyleSelect</Text>
        <View style={styles.separator} />
        <Text style={styles.subtitle}>{data.Nombre}</Text>
        <Text style={styles.text}>{data.Descripcion}</Text>
        <Text style={styles.text}>Código: {data.CodigoSKU}</Text>
        <Text style={styles.text}>Talla: {data.Talla}</Text>
        <Text style={styles.text}>Marca: {data.Marca}</Text>
        <Text style={styles.text}>Categoría: {data.NombreCategoria}</Text>
        <Text style={styles.text}>Subcategoría: {data.NombreSubcategoria}</Text>
        <Text style={styles.text}>Costo por Unidad: {data.CostoUnitario}</Text>
        <Text style={styles.text}>Cantidad total en Stock: {data.CantidadTotalEnStock}</Text>
      </View>
    </Page>
  </Document>
);

export default PDFReport;
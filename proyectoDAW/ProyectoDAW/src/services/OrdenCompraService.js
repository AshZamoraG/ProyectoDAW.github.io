import axios from 'axios';//fetch
const BASE_URL = import.meta.env.VITE_BASE_URL + 'ordencompra';
class OrdenCompraService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/proyectoDAW/producto
  getOrdenCompra() {
    return axios.get(BASE_URL);
  }
  //Obtener una prodcuto
  //localhost:81/proyectoDAW/producto/2
  getOrdenCompraById(Id){
    return axios.get(BASE_URL+"/getOrdenCompraById/"+Id)
  }

  OrdenCompraFactura(Id){
    return axios.get(BASE_URL+"/OrdenCompraFactura/"+Id)
  }
}
export default new OrdenCompraService();

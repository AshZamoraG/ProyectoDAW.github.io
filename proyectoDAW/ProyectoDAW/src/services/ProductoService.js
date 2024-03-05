import axios from 'axios';//fetch
const BASE_URL = import.meta.env.VITE_BASE_URL + 'producto';
class ProductoService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/proyectoDAW/producto
  getProducto() {
    return axios.get(BASE_URL);
  }
  //Obtener una prodcuto
  //localhost:81/proyectoDAW/producto/2


  getProductoById(Id){
    return axios.get(BASE_URL+"/getProductoById/"+Id)
  }
}
export default new ProductoService();

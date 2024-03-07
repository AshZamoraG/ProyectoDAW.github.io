import axios from 'axios';//fetch
const BASE_URL = import.meta.env.VITE_BASE_URL + 'inventario';
class InventarioService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/proyectoDAW/producto
  getInventario() {
    return axios.get(BASE_URL);
  }
  //Obtener una prodcuto
  //localhost:81/proyectoDAW/producto/2
  InventarioById(Id){
    return axios.get(BASE_URL+"/"+Id)
  }

  getByIdUsuario(Id){
    return axios.get(BASE_URL+"/getByIdUsuario/"+Id)
  }

  
}
export default new InventarioService();

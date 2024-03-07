import axios from 'axios';//fetch
const BASE_URL = import.meta.env.VITE_BASE_URL + 'subcategoria';
class SubcategoriaService {
  //Definición para Llamar al API y obtener el listado de películas
  //localhost:81/proyectoDAW/producto
  getSubcategoria() {
    return axios.get(BASE_URL);
  }
  //Obtener una prodcuto
  //localhost:81/proyectoDAW/producto/2
  SubcategoriaById(Id){
    return axios.get(BASE_URL+"/"+Id)
  }
}
export default new SubcategoriaService();

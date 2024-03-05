import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './components/Home/Home.jsx'
import { ListProducto } from './components/Producto/ListProducto.jsx'
import { PageNotFound } from './components/Home/PageNotFound.jsx'
import { DetailProducto } from './components/Producto/DetailProducto.jsx'
import TableProducto from './components/Producto/TableProducto.jsx'
import { ListOrdenCompra } from './components/OrdenCompra/ListOrdenCompra.jsx'
//import { DetailOrdenCompra } from './components/OrdenCompra/DetailOrdenCompra.jsx'
import { ListInventario } from './components/Inventario/ListInventario.jsx'
import { DetailOrdenCompra } from './components/OrdenCompra/DetailOrdenCompra.jsx'

const rutas=createBrowserRouter([
  {
    element: <App />,
    children:[
      {
        path:'/',
        element: <Home />
      },
      {
        path:'*',
        element: <PageNotFound />
      },
      {
        path:'/producto',
        element: <ListProducto />
      },
      {
        path:'/ordencompra',
        element: <ListOrdenCompra />
      },
      {
        path:'/Inventario',
        element: <ListInventario />
      },
      {
        path:'producto-table',
        element: <TableProducto />
      },
      {
        path:'/producto/:Id',
        element: <DetailProducto />
      },
      {
        path:'/ordencompra/:Id',
        element: <DetailOrdenCompra />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={rutas} />
  </React.StrictMode>,
)

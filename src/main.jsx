import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { Root } from './Root'
import { Inicio } from './screens/Inicio'
import { Login } from './Auth/Login'
import { Register } from './Auth/Register'
import { Perfil } from './screens/Perfil'
import { Viaje } from './screens/Viaje'

const router = createBrowserRouter([
	{
	  path: '/',
	  element: <Root/>,
	  children: [
		{ path: '/', element: <Inicio/> },
		{ path: 'login', element: <Login/> },
		{ path: 'register', element: <Register/> },
		{ path: 'perfil', element: <Perfil/> },
		{ path: 'nuevo-viaje/:estacionID', element: <Viaje/> },
		,
	  ]
	}
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

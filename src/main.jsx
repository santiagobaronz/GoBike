import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'

import { Root } from './Root'
import { Inicio } from './screens/Inicio'

const router = createBrowserRouter([
	{
	  path: '/',
	  element: <Root/>,
	  children: [
		{ path: '/', element: <Inicio/> },
	  ]
	}
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

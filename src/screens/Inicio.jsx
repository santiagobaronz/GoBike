import React, { useContext } from 'react'
import { Link } from 'react-router-dom'


export const Inicio = () => {
	return (
		<div className='overflow-hidden'>
			<img src="/bg-inicio.png" className='ml-16' />
			<div className='pl-16 pr-16 pb-16 pt-10'>
				<h1 className='text-text-color text-4xl font-semibold w-72'>Bienvenido a GoBike</h1>
				<p className='mt-8 text-[17px] text-text-color'>GoBike - Bogotá te ofrece soluciones de movilidad a la vuelta de la esquina.
					Ingresa y conviérte en un GoBiker.
				</p>
				<div className='mt-5'>
					<Link to={'/login'}>
						<button className='bg-purple-color w-full text-white-color h-14 rounded-lg mb-5'>Iniciar sesión</button>
					</Link>
					<Link to={'/register'}>
						<button className='bg-purple-darker-color text-white-color w-full h-14 rounded-lg'>Regístrase ahora</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

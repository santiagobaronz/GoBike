import React from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardBackspace } from 'react-icons/md'

export const Login = () => {
	return (
		<div className='overflow-hidden relative'>
			<Link to={'/'}>
				<button className='absolute left-10 top-10 bg-purple-color p-3 text-2xl flex justify-center items-center text-white-color  rounded-full'>
					<MdKeyboardBackspace></MdKeyboardBackspace>
				</button>
			</Link>
			<img src="/bg-login.png" className='ml-16' />
			<div className='pl-16 pr-16 pb-16 pt-10 -mt-3'>
				<p className=' text-[17px] text-text-color'>Ingresa con tu correo electrónico y contraseña 
				para hacer uso de nuestras bicicletas compartidas
				</p>

				<form action="" className='mt-5'>
					<label className='font-semibold text-[15.5px] text-text-color'>Correo electrónico</label>
					<input className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5' type="text" placeholder='Ingresa tu correo electrónico' />

					<label className='font-semibold text-[15.5px] text-text-color'>Contraseña</label>
					<input className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full' type="text" placeholder='Ingresa tu contraseña' />
				</form>

				<div className='mt-8'>
					<button className='bg-purple-color w-full text-white-color h-14 rounded-lg mb-5'>Iniciar sesión</button>
				</div>
			</div>
		</div>
	)
}

import React from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardBackspace } from 'react-icons/md'

export const Register = () => {
	return (
		<div className='overflow-hidden relative'>
			<Link to={'/'}>
				<button className='absolute right-10 top-10 bg-purple-color p-3 text-2xl flex justify-center items-center text-white-color  rounded-full'>
					<MdKeyboardBackspace></MdKeyboardBackspace>
				</button>
			</Link>
			<div className='pl-16 pr-16 pb-16 pt-10 mt-5'>
				<h2 className='text-text-color text-2xl font-semibold w-72 mb-4'>Registro</h2>
				<p className=' text-[17px] text-text-color w-72'>Completa la siguiente información para crear tu cuenta</p>

				<form action="" className='mt-8'>
					
					<label className='font-semibold text-[15.5px] text-text-color'>Nombres</label>
					<input className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5' type="text" placeholder='Ingresa tus nombres completos' />

					<label className='font-semibold text-[15.5px] text-text-color'>Apellidos</label>
					<input className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5' type="text" placeholder='Ingresa tus apellidos completos' />

					<label className='font-semibold text-[15.5px] text-text-color'>Correo electrónico</label>
					<input className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5' type="text" placeholder='Ingresa tu correo electrónico' />

					<label className='font-semibold text-[15.5px] text-text-color'>Contraseña</label>
					<input className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5' type="text" placeholder='Ingresa tu contraseña' />

					<label className='font-semibold text-[15.5px] text-text-color'>Nacionalidad</label>
					<input className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5' type="text" placeholder='Selecciona tu nacionalidad' />

				</form>

				<div className='mt-4'>
					<button className='bg-purple-darker-color w-full text-white-color h-14 rounded-lg mb-5'>Siguiente paso</button>
				</div>
			</div>
		</div>
	)
}

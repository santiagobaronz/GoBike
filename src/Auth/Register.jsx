import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardBackspace } from 'react-icons/md'

export const Register = () => {

	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		nombres: '',
		apellidos: '',
		correo: '',
		contrasena: '',
		nacionalidad: '',
		tipoID: '',
		numeroID: '',
		fechaNacimiento: '',
		sexo: '',
		telefono: '',
		eps: ''

	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleNextStep = () => {
		setStep(step + 1)
	}

	const handlePreviousStep = () => {
		setStep(step - 1)
	}

	const renderStepOne = () => (
		<>
			<label className='font-semibold text-[15.5px] text-text-color'>Nombres</label>
			<input
				className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5'
				type='text'
				name='nombres'
				value={formData.nombres}
				onChange={handleInputChange}
				placeholder='Ingresa tus nombres completos'
			/>

			<label className='font-semibold text-[15.5px] text-text-color'>Apellidos</label>
			<input
				className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5'
				type='text'
				name='apellidos'
				value={formData.apellidos}
				onChange={handleInputChange}
				placeholder='Ingresa tus apellidos completos'
			/>

			<label className='font-semibold text-[15.5px] text-text-color'>Correo electrónico</label>
			<input
				className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5'
				type='text'
				name='correo'
				value={formData.correo}
				onChange={handleInputChange}
				placeholder='Ingresa tu correo electrónico'
			/>

			<label className='font-semibold text-[15.5px] text-text-color'>Contraseña</label>
			<input
				className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5'
				type='text'
				name='contrasena'
				value={formData.contrasena}
				onChange={handleInputChange}
				placeholder='Ingresa tu contraseña'
			/>

			<label className='font-semibold text-[15.5px] text-text-color'>Nacionalidad</label>
			<input
				className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5'
				type='text'
				name='nacionalidad'
				value={formData.nacionalidad}
				onChange={handleInputChange}
				placeholder='Selecciona tu nacionalidad'
			/>
		</>
	);

	const renderStepTwo = () => (
		<>
			<label className='font-semibold text-[15.5px] text-text-color'>Tipo y numero de identificación</label>
			<div className='flex gap-5'>
				<input
					className='w-1/3 h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 mb-5'
					type='text'
					name='tipoID'
					value={formData.tipoID}
					onChange={handleInputChange}
					placeholder='Tipo ID'
				/>


				<input
					className=' h-11 pl-5 bg-bg-color pr-5 text-text-color rounded-md mt-2 w-2/3 mb-5'
					type='text'
					name='numeroID'
					value={formData.numeroID}
					onChange={handleInputChange}
					placeholder='Numero de ID'
				/>
			</div>

			<label className='font-semibold text-[15.5px] text-text-color'>Fecha de nacimiento</label>
			<input
				className=' h-11 pl-5 pr-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5'
				type='date'
				name='fechaNacimiento'
				value={formData.fechaNacimiento}
				onChange={handleInputChange}
			/>

			<label className='font-semibold text-[15.5px] text-text-color'>Sexo</label>
			<input
				className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5'
				type='text'
				name='sexo'
				value={formData.seo}
				onChange={handleInputChange}
				placeholder='Selecciona tu sexo biológico'
			/>

			<label className='font-semibold text-[15.5px] text-text-color'>Número de teléfono</label>
			<input
				className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5'
				type='number'
				name='telefono'
				min={0}
				max={9999999999}
				value={formData.telefono}
				onChange={handleInputChange}
				placeholder='Ingresa tu número de teléfono'
			/>

			<label className='font-semibold text-[15.5px] text-text-color'>EPS</label>
			<input
				className=' h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5'
				type='text'
				name='eps'
				value={formData.eps}
				onChange={handleInputChange}
				placeholder='Selecciona tu EPS'
			/>
		</>
	);

	return (
		<div className='overflow-hidden relative'>
			{step === 1 ? (
				<Link to={'/'}>
					<button className='absolute right-10 top-10 bg-purple-color p-3 text-2xl flex justify-center items-center text-white-color  rounded-full'>
						<MdKeyboardBackspace></MdKeyboardBackspace>
					</button>
				</Link>
			) :
				<button onClick={handlePreviousStep} className='absolute right-10 top-10 bg-purple-color p-3 text-2xl flex justify-center items-center text-white-color  rounded-full'>
					<MdKeyboardBackspace></MdKeyboardBackspace>
				</button>
			}
			<div className='pl-16 pr-16 pb-16 pt-10 mt-5'>
				<h2 className='text-text-color text-2xl font-semibold w-72 mb-4'>Registro</h2>
				<p className=' text-[17px] text-text-color w-72'>Completa la siguiente información para crear tu cuenta</p>

				<form action="" className='mt-8'>

					{(() => {
						switch (step) {
							case 1:
								return renderStepOne();
							case 2:
								return renderStepTwo();
						}
					})()}

				</form>

				<div className='mt-4'>
					<button className='bg-purple-darker-color w-full text-white-color h-14 rounded-lg mb-5' onClick={handleNextStep}>Siguiente paso</button>
				</div>
			</div>
		</div>
	)
}

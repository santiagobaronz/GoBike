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
		eps: '',
		plan: '',

	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handlePlanReset = (event) => {
		if (formData.plan === event.target.value) {
			setFormData({
				...formData,
				plan: ''
			});
		}
	};

	const handleNextStep = () => {
		setStep(step + 1)
	}

	const handlePreviousStep = () => {
		setStep(step - 1)
	}

	const renderStepOne = () => (
		<div>
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
		</div>
	);

	const renderStepTwo = () => (
		<div>
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
				value={formData.sexo}
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
				min={0}
				max={9999999999}
				value={formData.eps}
				onChange={handleInputChange}
				placeholder='Selecciona tu EPS'
			/>
		</div>
	);

	const renderStepThree = () => (
		<div>
			<label>
				<input type="radio" name="plan" value="Diario" onChange={handleInputChange} onClick={handlePlanReset}  checked={formData.plan === "Diario"}  style={{ display: "none" }} />
				<div className=' p-[16px] rounded-lg mb-2 transition-all text-white-color border-2 border-daily border-opacity-30' style={{ backgroundColor: formData.plan === "Diario" ? "#7F91E6" : "" }}>
					<div className='flex justify-between mb-3'>
						<h2>Plan diario</h2>
						<span>$9.990</span>
					</div>
					<ul className='text-sm'>
						<li className='mb-1'>Hasta 4 viajes por día</li>
						<li className='mb-1'>$890 por cada retiro de bicicleta</li>
						<li className='mb-1'>Uso máximo de 1 hora por retiro</li>
						<li className='mb-1'>$150 por minuto adicional</li>
					</ul>
				</div>
			</label>
			<label>
				<input type="radio" name="plan" value="Mensual" onChange={handleInputChange} onClick={handlePlanReset}  checked={formData.plan === "Mensual"} style={{ display: "none" }} />
				<div className=' p-[16px] rounded-lg mb-2 text-white-color transition-all border-2 border-monthly border-opacity-30' style={{ backgroundColor: formData.plan === "Mensual" ? "#438196" : "" }}>
					<div className='flex justify-between mb-3'>
						<h2>Plan mensual</h2>
						<span>$31.990</span>
					</div>
					<ul className='text-sm'>
						<li className='mb-1'>Hasta 4 viajes por día</li>
						<li className='mb-1'>$890 por cada retiro de bicicleta</li>
						<li className='mb-1'>Uso máximo de 1 hora por retiro</li>
						<li className='mb-1'>$75 por minuto adicional</li>
					</ul>
				</div>
			</label>
			<label>
				<input type="radio" name="plan" value="Anual" onChange={handleInputChange} onClick={handlePlanReset}  checked={formData.plan === "Anual"} style={{ display: "none" }} />
				<div className=' p-[16px] rounded-lg text-white-color transition-all border-2 border-yearly border-opacity-30' style={{ backgroundColor: formData.plan === "Anual" ? "#38914F" : "" }}>
					<div className='flex justify-between mb-3'>
						<h2>Plan anual</h2>
						<span>$229.900</span>
					</div>
					<ul className='text-sm'>
						<li className='mb-1'>Hasta 4 viajes por día</li>
						<li className='mb-1'>$890 por cada retiro de bicicleta</li>
						<li className='mb-1'>Uso máximo de 1 hora por retiro</li>
						<li className='mb-1'>$75 por minuto adicional</li>
					</ul>
				</div>
			</label>
			{formData.plan == "Diario" || formData.plan == "Mensual"  || formData.plan == "Anual" ? (
				<button className='bg-purple-darker-color w-full text-white-color h-12 rounded-lg mt-4' onClick={handleNextStep}>Siguiente paso</button>
			) : (
				<label>
					<input type="radio" name="plan" value="Otro" onChange={handleInputChange} onClick={handleNextStep} style={{ display: "none" }} />
					<p className='text-center text-[15px] text-text-color mt-6 cursor-pointer' >No necesito un plan (Aplican tarifas platas)</p>
				</label>
			)}

		</div>
	)

	return (
		<div className='overflow-hidden relative w-full'>
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
				<p className='text-[17px] text-text-color w-72'>
					{(() => {
						switch (step) {
							case 1:
								return 'Completa la siguiente información para crear tu cuenta'
							case 2:
								return 'Completa la siguiente información para crear tu cuenta'
							case 3:
								return 'Escoge un plan que se adapte a tus necesidades'
							case 4:
								return 'Agrega un método de pago para usar los servicios de GoBike'
						}
					})()}
				</p>

				<form action="" className='mt-7'>

					{(() => {
						switch (step) {
							case 1:
								return renderStepOne();
							case 2:
								return renderStepTwo();
							case 3:
								return renderStepThree();
						}
					})()}

				</form>


				<div className='mt-4'>
					{(() => {
						switch (step) {
							case 1:
								return <button className='bg-purple-darker-color w-full text-white-color h-14 rounded-lg mb-5' onClick={handleNextStep}>Siguiente paso</button>
							case 2:
								return <button className='bg-purple-darker-color w-full text-white-color h-14 rounded-lg mb-5' onClick={handleNextStep}>Siguiente paso</button>
							case 3:
								return;
							case 4:
								return <button className='bg-purple-darker-color w-full text-white-color h-14 rounded-lg mb-5' onClick={handleNextStep}>Finalizar registro</button>
						}
					})()}
				</div>
			</div>
		</div>
	)
}

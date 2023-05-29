import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { MdKeyboardBackspace, MdInfoOutline, MdDone, MdNotInterested } from 'react-icons/md'
import { BsFillCreditCard2BackFill, BsFillCreditCardFill } from "react-icons/bs";
import validateData from './components/ValidateData';
import registerUserDB from './components/registerUserDB';

export const Register = () => {

	const [step, setStep] = useState(1);
	const [tooltip, setTooltip] = useState(false);
	const [errorFields, setErrorFields] = useState([]);
	const [resultRegister, setResultRegister] = useState();
	const [formData, setFormData] = useState({
		nombres: 'Santiago',
		apellidos: 'Baron',
		correo: 'sbz@cor.com',
		contrasena: 'Prueba1234*',
		nacionalidad: 'Colombia',
		tipoID: 'CC',
		numeroID: '12345678',
		fechaNacimiento: '2003-06-07',
		sexo: 'M',
		telefono: '3203773769',
		eps: 'Compensar',
		plan: 'Diario',
		titularTarjeta: 'Santiago',
		tipoTarjeta: 'DEB',
		numeroTarjeta: '1234123412341234',
		mesTarjeta: '12',
		yearTarjeta: '24',
		codigoTarjeta: '1234',

	});

	const registerUser = async () => {
		const result = await registerUserDB(formData);
		setResultRegister(result);
		setTimeout(function () { window.location.href = "/login"; }, 3000);
	}

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

	const handleTypeCardReset = (event) => {
		if (formData.tipoTarjeta === event.target.value) {
			setFormData({
				...formData,
				tipoTarjeta: ''
			});
		}
	};

	const handleNextStep = () => {

		let hasErrors = false;
		const fieldsWithErrors = [];

		if (step == 1) {

			if (!validateData(formData.nombres, 'dataText')) {
				hasErrors = true;
				fieldsWithErrors.push('nombres');
			}

			if (!validateData(formData.apellidos, 'dataText')) {
				hasErrors = true;
				fieldsWithErrors.push('apellidos');
			}

			if (!validateData(formData.correo, 'dataEmail')) {
				hasErrors = true;
				fieldsWithErrors.push('correo');
			}

			if (!validateData(formData.contrasena, 'dataPassword')) {
				hasErrors = true;
				fieldsWithErrors.push('contrasena');
			}

			if (!validateData(formData.nacionalidad, 'dataText')) {
				hasErrors = true;
				fieldsWithErrors.push('nacionalidad');
			}
		}

		if (step == 2) {

			if (!validateData(formData.tipoID, 'dataText')) {
				hasErrors = true;
				fieldsWithErrors.push('tipoID');
			}
			if (!validateData(formData.numeroID, 'dataNumber')) {
				hasErrors = true;
				fieldsWithErrors.push('numeroID');
			}
			if (!validateData(formData.fechaNacimiento, 'dataDate')) {
				hasErrors = true;
				fieldsWithErrors.push('fechaNacimiento');
			}
			if (!validateData(formData.sexo, 'dataText')) {
				hasErrors = true;
				fieldsWithErrors.push('sexo');
			}
			if (!validateData(formData.telefono, 'dataPhone')) {
				hasErrors = true;
				fieldsWithErrors.push('telefono');
			}
			if (!validateData(formData.eps, 'dataText')) {
				hasErrors = true;
				fieldsWithErrors.push('eps');
			}
		}

		if (step == 4) {
			if (!validateData(formData.titularTarjeta, 'dataText')) {
				hasErrors = true;
				fieldsWithErrors.push('titularTarjeta');
			}
			if (!validateData(formData.tipoTarjeta, 'dataText')) {
				hasErrors = true;
				fieldsWithErrors.push('tipoTarjeta');
			}
			if (!validateData(formData.numeroTarjeta, 'dataCard')) {
				hasErrors = true;
				fieldsWithErrors.push('numeroTarjeta');
			}
			if (!validateData(formData.mesTarjeta, 'dataMonth')) {
				hasErrors = true;
				fieldsWithErrors.push('mesTarjeta');
			}
			if (!validateData(formData.yearTarjeta, 'dataYear')) {
				hasErrors = true;
				fieldsWithErrors.push('yearTarjeta');
			}
			if (!validateData(formData.codigoTarjeta, 'dataNumber')) {
				hasErrors = true;
				fieldsWithErrors.push('codigoTarjeta');
			}
		}

		if (hasErrors) {
			setErrorFields(fieldsWithErrors);
			console.log(fieldsWithErrors)
		} else {
			setErrorFields([]);
			if (step != 4) {
				setStep(step + 1);
			} else {
				registerUser();
			}
		}
	}

	const handlePreviousStep = () => {
		setStep(step - 1)
	}

	const renderStepOne = () => (
		<div>
			<label className='font-semibold text-[15.5px] text-text-color'>Nombres</label>
			<input
				className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 ${errorFields.includes('nombres') ? 'error' : ''}`}
				type='text'
				name='nombres'
				value={formData.nombres}
				onChange={handleInputChange}
				placeholder='Ingresa tus nombres completos'
			/>

			<label className='font-semibold text-[15.5px] text-text-color'>Apellidos</label>
			<input
				className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 ${errorFields.includes('apellidos') ? 'error' : ''}`}
				type='text'
				name='apellidos'
				value={formData.apellidos}
				onChange={handleInputChange}
				placeholder='Ingresa tus apellidos completos'
			/>

			<label className='font-semibold text-[15.5px] text-text-color'>Correo electrónico</label>
			<input
				className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 ${errorFields.includes('correo') ? 'error' : ''}`}
				type='mail'
				name='correo'
				value={formData.correo}
				onChange={handleInputChange}
				placeholder='Ingresa tu correo electrónico'
			/>

			<div className='relative'>
				<label className='font-semibold text-[15.5px] text-text-color'>Contraseña</label>
				<input
					className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 ${errorFields.includes('contrasena') ? 'error' : ''}`}
					type='password'
					name='contrasena'
					value={formData.contrasena}
					onChange={handleInputChange}
					placeholder='Ingresa tu contraseña'
				/>
				<span className='absolute top-11 right-4 cursor-pointer text-xl text-purple-color'
					onClick={() => tooltip ? setTooltip(false) : setTooltip(true)}>
					<MdInfoOutline></MdInfoOutline>
				</span>
				{tooltip ? (
					<div className='absolute w-full bg-daily text-white-color text-left p-5 -top-48 text-sm rounded-md'>
						<p className='mb-2'>Tu clave debe contener:</p>
						<ul className='list-disc pl-4'>
							<li>Al menos 8 caracteres de longitud.</li>
							<li>Al menos una letra mayúscula.</li>
							<li>Al menos una letra minúscula.</li>
							<li>Al menos un dígito numérico.</li>
							<li>Puede contener caracteres especiales.</li>
						</ul>
					</div>
				) : null}
			</div>


			<label className='font-semibold text-[15.5px] text-text-color'>Nacionalidad</label>
			<select
				className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 border-r-[15px] border-bg-color ${errorFields.includes('nacionalidad') ? 'error' : ''}`}
				name="nacionalidad"
				value={formData.nacionalidad}
				onChange={handleInputChange}
				placeholder="Selecciona tu nacionalidad"
			>
				<option value="">Selecciona tu nacionalidad</option>
				<option value="Argentina">Argentina</option>
				<option value="Bolivia">Bolivia</option>
				<option value="Brasil">Brasil</option>
				<option value="Chile">Chile</option>
				<option value="Colombia">Colombia</option>
				<option value="Costa Rica">Costa Rica</option>
				<option value="Cuba">Cuba</option>
				<option value="Ecuador">Ecuador</option>
				<option value="El Salvador">El Salvador</option>
				<option value="Guatemala">Guatemala</option>
				<option value="Honduras">Honduras</option>
				<option value="México">México</option>
				<option value="Nicaragua">Nicaragua</option>
				<option value="Panamá">Panamá</option>
				<option value="Paraguay">Paraguay</option>
				<option value="Perú">Perú</option>
				<option value="República Dominicana">República Dominicana</option>
				<option value="Uruguay">Uruguay</option>
				<option value="Venezuela">Venezuela</option>

			</select>
		</div>
	);

	const renderStepTwo = () => (
		<div>
			<label className='font-semibold text-[15.5px] text-text-color'>Tipo y numero de identificación</label>
			<div className='flex gap-5'>
				<select
					className={`w-1/3 h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 mb-5 border-r-8 border-bg-color ${errorFields.includes('tipoID') ? 'error' : ''}`}
					name='tipoID'
					value={formData.tipoID}
					onChange={handleInputChange}
				>
					<option value=''>Tipo</option>
					<option value='CC'>CC</option>
					<option value='PA'>PA</option>
					<option value='CE'>CE</option>
				</select>
				<input
					className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-2/3 mb-5 ${errorFields.includes('numeroID') ? 'error' : ''}`}
					type='number'
					name='numeroID'
					value={formData.numeroID}
					onChange={handleInputChange}
					placeholder='Numero de ID'
				/>
			</div>
			<label className='font-semibold text-[15.5px] text-text-color'>Fecha de nacimiento</label>
			<input
				className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 border-r-[15px] border-bg-color ${errorFields.includes('fechaNacimiento') ? 'error' : ''}`}
				type='date'
				name='fechaNacimiento'
				value={formData.fechaNacimiento}
				onChange={handleInputChange}
			/>
			<label className='font-semibold text-[15.5px] text-text-color'>Sexo</label>
			<select
				className={`w-full h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 mb-5 border-r-8 border-bg-color ${errorFields.includes('sexo') ? 'error' : ''}`}
				name='sexo'
				value={formData.sexo}
				onChange={handleInputChange}
			>
				<option value=''>Selecciona tu sexo biológico</option>
				<option value='M'>Masculino</option>
				<option value='F'>Femenino</option>
				<option value='O'>Otro</option>
			</select>
			<label className='font-semibold text-[15.5px] text-text-color'>Número de teléfono</label>
			<input
				className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 border-r-[15px] border-bg-color ${errorFields.includes('telefono') ? 'error' : ''}`}
				type='number'
				name='telefono'
				min={0}
				max={9999999999}
				value={formData.telefono}
				onChange={handleInputChange}
				placeholder='Ingresa tu número de teléfono'
			/>
			<label className='font-semibold text-[15.5px] text-text-color'>EPS</label>
			<select
				className={`w-full h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 mb-5 border-r-8 border-bg-color ${errorFields.includes('eps') ? 'error' : ''}`}
				name='eps'
				value={formData.eps}
				onChange={handleInputChange}
			>
				<option value=''>Selecciona tu EPS</option>
				<option value='Compensar'>Compensar</option>
				<option value='Sura'>Sura</option>
				<option value='Sanitas'>Sanitas</option>
				<option value='Coomeva'>Coomeva</option>
				<option value='Famisanar'>Famisanar</option>
				<option value='Salud Total'>Salud Total</option>
				<option value='Nueva EPS'>Nueva EPS</option>
				<option value='Aliansalud'>Aliansalud</option>
			</select>
		</div>
	);

	const renderStepThree = () => (
		<div>
			<label>
				<input type="radio" name="plan" value="PDI" onChange={handleInputChange} onClick={handlePlanReset} checked={formData.plan === "PDI"} style={{ display: "none" }} />
				<div className=' p-[16px] rounded-lg mb-2 transition-all text-white-color border-2 border-daily border-opacity-30' style={{ backgroundColor: formData.plan === "PDI" ? "#7F91E6" : "" }}>
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
				<input type="radio" name="plan" value="PME" onChange={handleInputChange} onClick={handlePlanReset} checked={formData.plan === "PME"} style={{ display: "none" }} />
				<div className=' p-[16px] rounded-lg mb-2 text-white-color transition-all border-2 border-monthly border-opacity-30' style={{ backgroundColor: formData.plan === "PME" ? "#438196" : "" }}>
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
				<input type="radio" name="plan" value="PAN" onChange={handleInputChange} onClick={handlePlanReset} checked={formData.plan === "PAN"} style={{ display: "none" }} />
				<div className=' p-[16px] rounded-lg text-white-color transition-all border-2 border-yearly border-opacity-30' style={{ backgroundColor: formData.plan === "PAN" ? "#38914F" : "" }}>
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
			{formData.plan == "PDI" || formData.plan == "PME" || formData.plan == "PAN" ? (
				<button className='bg-purple-darker-color w-full text-white-color h-12 rounded-lg mt-4' onClick={handleNextStep}>Siguiente paso</button>
			) : (
				<label>
					<input type="radio" name="plan" value="PES" onChange={handleInputChange} onClick={handleNextStep} style={{ display: "none" }} />
					<p className='text-center text-[15px] text-text-color mt-6 cursor-pointer' >No necesito un plan (Aplican tarifas planas)</p>
				</label>
			)}

		</div>
	)

	const renderStepFourth = () => (
		<div>
			<label className='font-semibold text-[15.5px] text-text-color'>Nombre del titular</label>
			<input
				className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 ${errorFields.includes('titularTarjeta') ? 'error' : ''}`}
				type='text'
				name='titularTarjeta'
				value={formData.titularTarjeta}
				onChange={handleInputChange}
				placeholder='Ingresa el nombre del titular'
			/>

			<div className='flex gap-x-5 mb-5'>
				<label className='w-1/2'>
					<input type="radio" name="tipoTarjeta" value="CRE" onChange={handleInputChange} onClick={handleTypeCardReset} checked={formData.tipoTarjeta === "CRE"} style={{ display: "none" }} />
					<div className={`p-[15px] rounded-lg mb-2 inputTypeOne transition-all text-white-color border-2 border-daily border-opacity-30 ${errorFields.includes('tipoTarjeta') ? 'errorTipo' : ''}`} style={{ backgroundColor: formData.tipoTarjeta === "CRE" ? "#7F91E6" : "" }}>
						<div className='justify-center flex items-center gap-x-3'>
							<BsFillCreditCard2BackFill></BsFillCreditCard2BackFill>
							<h4>Crédito</h4>
						</div>
					</div>
				</label>
				<label className='w-1/2'>
					<input type="radio" name="tipoTarjeta" value="DEB" onChange={handleInputChange} onClick={handleTypeCardReset} checked={formData.tipoTarjeta === "DEB"} style={{ display: "none" }} />
					<div className={`p-[15px] rounded-lg mb-2 inputTypeTwo text-white-color transition-all border-2 border-monthly border-opacity-30 ${errorFields.includes('tipoTarjeta') ? 'errorTipo' : ''}`} style={{ backgroundColor: formData.tipoTarjeta === "DEB" ? "#438196" : "" }}>
						<div className='justify-center flex items-center gap-x-3'>
							<BsFillCreditCardFill></BsFillCreditCardFill>
							<h4>Débito</h4>
						</div>
					</div>
				</label>
			</div>


			<label className='font-semibold text-[15.5px] text-text-color'>Número de tarjeta</label>
			<input
				className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 ${errorFields.includes('numeroTarjeta') ? 'error' : ''}`}
				type='number'
				name='numeroTarjeta'
				min={0}
				max={9999999999}
				value={formData.numeroTarjeta}
				onChange={handleInputChange}
				placeholder='Ingresa tu número de tarjeta'
			/>
			<label className='font-semibold text-[15.5px] text-text-color'>Fecha de expiración</label>
			<div className='flex gap-5'>
				<input
					className={`w-1/2 h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 mb-5 ${errorFields.includes('mesTarjeta') ? 'error' : ''}`}
					type='number'
					name='mesTarjeta'
					min={1}
					max={12}
					value={formData.mesTarjeta}
					onChange={handleInputChange}
					placeholder='Mes'
				/>
				<input
					className={`w-1/2 h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 mb-5 ${errorFields.includes('yearTarjeta') ? 'error' : ''}`}
					type='number'
					name='yearTarjeta'
					min={2023}
					max={2050}
					value={formData.yearTarjeta}
					onChange={handleInputChange}
					placeholder='Año'
				/>
			</div>
			<label className='font-semibold text-[15.5px] text-text-color'>Código de seguridad</label>
			<input
				className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 ${errorFields.includes('codigoTarjeta') ? 'error' : ''}`}
				type='number'
				name='codigoTarjeta'
				min={0}
				max={99999}
				value={formData.codigoTarjeta}
				onChange={handleInputChange}
				placeholder='Ingresa el código de seguridad'
			/>
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


				{resultRegister != undefined && (
					<div className='absolute bg-purple-darker-color text-text-color top-40 left-[75px] w-4/6 p-9 text-center rounded-lg'>
						{resultRegister === 'ok' ? (
							<div className='m-auto'>
								<div className='text-xl'>
									<MdDone className='m-auto text-8xl mb-5'></MdDone>
								</div>
								<h3 className='mb-3 text-xl'>Registrado</h3>
								<p className='mb-5'>El usuario se ha registrado con éxito</p>
								<hr />
								<p className='mt-5'>Serás redireccionado para iniciar sesión</p>
							</div>
						) : resultRegister === 'dup' ? (
							<div>

								<MdNotInterested className='m-auto text-8xl mb-5'></MdNotInterested>
								<h3 className='mb-3 text-xl'>Error</h3>
								<p>Este usuario ya está registrado</p>
							</div>
						) : (<></>)}
					</div>
				)}

				<form action="" className='mt-7'>

					{(() => {
						switch (step) {
							case 1:
								return renderStepOne();
							case 2:
								return renderStepTwo();
							case 3:
								return renderStepThree();
							case 4:
								return renderStepFourth();
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

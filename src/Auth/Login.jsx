import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MdDone, MdNotInterested } from 'react-icons/md'
import { MdKeyboardBackspace } from 'react-icons/md'
import validateData from './components/ValidateData';
import loginUser from './components/loginUser';
import { AuthContext } from '../Root';

export const Login = () => {

	const { isLoggedIn, setIsLoggedIn, setUserData } = useContext(AuthContext);

	const [errorFields, setErrorFields] = useState([]);
	const [resultRegister, setResultRegister] = useState();
	const [responseLogin, setResponseLogin] = useState();

	const navigate = useNavigate();

	useEffect(() => {
		if (isLoggedIn) {
		  navigate('/perfil');
		}
	  }, [isLoggedIn, navigate]);

	const [formData, setFormData] = useState({
		correo: 'sbz@cor.com',
		contrasena: 'Prueba1234*'
	});

	const handleInputChange = (event) => {
		const { name, value } = event.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const login = async () => {

		let hasErrors = false;
		const fieldsWithErrors = [];

		if (!validateData(formData.correo, 'dataEmail')) {
			hasErrors = true;
			fieldsWithErrors.push('correo');
		}

		if (!validateData(formData.contrasena, 'dataPassword')) {
			hasErrors = true;
			fieldsWithErrors.push('contrasena');
		}

		if (hasErrors) {
			setErrorFields(fieldsWithErrors);
			console.log(fieldsWithErrors);
		} else {
			setErrorFields([]);

			const response = await loginUser(formData);
			setResultRegister(true);
			setResponseLogin(response);

			if (response) {
				setIsLoggedIn(true);
				setUserData(response)

				const sesion = {
					userID: response.k_idUsuario,
				};

				localStorage.setItem('sesion', JSON.stringify(sesion));

				navigate('/perfil');
			}
		}
	}

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

				{resultRegister != undefined && (
					<div className='absolute bg-purple-darker-color text-text-color top-40 left-[75px] w-4/6 p-9 text-center rounded-lg'>
						{responseLogin ? (
							<div className='m-auto'>
								<div className='text-xl'>
									<MdDone className='m-auto text-8xl mb-5'></MdDone>
								</div>
								<h3 className='mb-3 text-xl'>Sesión iniciada</h3>
								<p className='mb-5'>Has iniciado sesión con éxito</p>
								<hr />
								<p className='mt-5'>Serás redireccionado a tu perfil</p>
							</div>
						) : !responseLogin ? (
							<div>

								<MdNotInterested className='m-auto text-8xl mb-5'></MdNotInterested>
								<h3 className='mb-3 text-xl'>Error</h3>
								<p>Datos incorrectos o usuario no registrado</p>
							</div>
						) : (<></>)}
					</div>
				)}

				<form action="" className='mt-5'>
					<label className='font-semibold text-[15.5px] text-text-color'>Correo electrónico</label>
					<input className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full mb-5 ${errorFields.includes('correo') ? 'error' : ''}`}
						name='correo'
						value={formData.correo}
						onChange={handleInputChange}
						type="text"
						placeholder='Ingresa tu correo electrónico' />

					<label className='font-semibold text-[15.5px] text-text-color'>Contraseña</label>
					<input className={`h-11 pl-5 bg-bg-color text-text-color rounded-md mt-2 w-full ${errorFields.includes('contrasena') ? 'error' : ''}`}
						name='contrasena'
						value={formData.contrasena}
						onChange={handleInputChange}
						type="password"
						placeholder='Ingresa tu contraseña' />
				</form>

				<div className='mt-8'>
					<button className='bg-purple-color w-full text-white-color h-14 rounded-lg mb-5' onClick={login}>Iniciar sesión</button>
				</div>
			</div>
		</div>
	)
}

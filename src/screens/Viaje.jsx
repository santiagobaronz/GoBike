import React, { useContext, useEffect, useState } from 'react';
import updateData from '../Auth/components/updateData';
import { AuthContext } from '../Root';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdKeyboardBackspace } from 'react-icons/md'
import getEstacion from '../components/getEstacion';
import iniciarNuevoViaje from '../components/iniciarViaje';
import getEstacionesLibres from '../components/getEstacionesLibres';
import finalizarNuevoViaje from '../components/finalizarViaje';

export const Viaje = () => {

	const { isLoggedIn, userData, setUserData } = useContext(AuthContext);
	const [estacionSeleccionada, setEstacionSeleccionada] = useState([]);
	const [estacionesLibres, setEstacionesLibres] = useState([])
	const [enViaje, setEnViaje] = useState(false)
	const [popUp, setPopUp] = useState(false)
	const [estacionFinalizacion, setEstacionFinalizacion] = useState([]);

	const dataEstacion = useLocation().state;
	const navigate = useNavigate();

	const fetchUserData = async () => {
		const newUserData = await updateData(userData.k_idUsuario);
		setUserData(newUserData);
	};

	const fetchEstacionData = async () => {
		const estacionData = await getEstacion(dataEstacion.idEstacion);
		setEstacionSeleccionada(estacionData);
	}

	const fetchEstacionFinalizacionData = async (estacionID) => {
		const estacionData = await getEstacion(estacionID);
		return estacionData;
	}

	const fetchEstacionesDisponibles = async () => {
		const estacionesDisponibles = await getEstacionesLibres(userData.k_idUsuario)
		setEstacionesLibres(estacionesDisponibles)
	}

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login');
		} else {
			fetchUserData();
			fetchEstacionData();
		}
	}, [isLoggedIn, navigate]);

	const randomColor = () => {
		const elementos = ['bg-brown', 'bg-monthly', 'bg-yearly', 'bg-orange', 'bg-red'];
		const indiceAleatorio = Math.floor(Math.random() * elementos.length);
		return elementos[indiceAleatorio];
	}

	function convertirHoraASegundos(hora) {
		if (hora != undefined) {
			const partes = hora.split(":");
			const horas = parseInt(partes[0], 10);
			const minutos = parseInt(partes[1], 10);
			const segundos = parseInt(partes[2], 10);

			const totalSegundos = horas * 3600 + minutos * 60 + segundos;
			return totalSegundos;
		} else {
			return 3600;
		}
	}

	var countdownTime = convertirHoraASegundos(userData.o_tiempoViaje);

	function updateCountdown() {
		var hours = Math.floor(countdownTime / 3600);
		var minutes = Math.floor((countdownTime % 3600) / 60);
		var seconds = countdownTime % 60;

		hours = hours < 10 ? "0" + hours : hours;
		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		var time = hours + ":" + minutes + ":" + seconds;

		document.getElementById("countdown").innerText = time;
		countdownTime--;

		if (countdownTime < 0) {
			clearInterval(countdownInterval);
			document.getElementById("countdown").innerText = "¡Tiempo finalizado!";
		}
	}

	const iniciarViaje = async () => {
		setEnViaje(true)
		var countdownInterval = setInterval(updateCountdown, 1000);
		await iniciarNuevoViaje(userData, estacionSeleccionada);
		await fetchEstacionesDisponibles();
	}

	const popAlertFinalizar = (codigoEstacion) => {
		setPopUp(true)
		setEstacionFinalizacion(codigoEstacion)
	}

	const finalizarViaje = async () => {
		const estacionToSend = await fetchEstacionFinalizacionData(estacionFinalizacion)
		finalizarNuevoViaje(userData, estacionToSend)
		navigate('/perfil');
	}

	return (
		<div className="p-16 w-full relative">
			<Link to={'/perfil'}>
				<button className='absolute right-10 top-12 bg-purple-color p-3 text-2xl flex justify-center items-center text-white-color  rounded-full'>
					<MdKeyboardBackspace></MdKeyboardBackspace>
				</button>
			</Link>

			<div>
				{popUp && (
					<div className='absolute z-50 bg-app-color text-white-color w-4/6 left-[75px] p-10 rounded-xl bottom-16'>
						<h2 className='text-center mb-6'>¿Seguro que desea finalizar el viaje?</h2>
						<div className='flex gap-x-5 justify-between'>
							<button className='text-center border w-full h-10 rounded-md' onClick={finalizarViaje}>Finalizar</button>
							<button className='text-center bg-orange w-full h-10 rounded-md' onClick={() => {setPopUp(false); setEstacionFinalizacion('')}}>Cancelar</button>
						</div>
					</div>
				)}

				<h2 className='text-white-color text-2xl font-semibold'>Iniciar nuevo viaje</h2>
				<h4 className='mt-6 text-text-color'>Estacion seleccionada: </h4>
				<ul className='mt-2 text-white-color'>
					<li className={`w-full p-5 ${randomColor()} mb-4 rounded-md cursor-pointer transition-all hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl`}>
						<div className='flex justify-between items-center'>
							<div>
								<p>{estacionSeleccionada.n_nombreEstacion}</p>
								<p className='text-sm'>{estacionSeleccionada.n_direccion}</p>
							</div>
							<div className='bg-white-color rounded-full w-9 h-9 flex justify-center items-center'>
								<p className='text-bg-color font-semibold text-center'>{estacionSeleccionada.q_numeroBicicletas}</p>
							</div>
						</div>
					</li>
				</ul>
				{!enViaje && (
					<button onClick={iniciarViaje} className='bg-purple-color w-full text-white-color h-14 rounded-lg mb-5 transition-all hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl'>Iniciar viaje</button>
				)}
			</div>

			{enViaje && (
				<div className='mt-6'>
					<h2 className='text-white-color text-xl font-semibold'>Sobre este viaje:</h2>
					<div className='bg-bg-color p-10 mt-3 rounded-lg'>
						<div id="countdown" className='text-white-color  text-5xl font-medium text-center'></div>
						<p className=' text-center text-text-color mt-2'>Tiempo restante</p>
					</div>
					<div className='mt-5'>
						<h4 className='text-text-color font-medium'>Estaciones libres:</h4>
						<ul className='mt-4 text-white-color'>
							{estacionesLibres.map((estacion) => (
								<li onClick={() => {popAlertFinalizar(estacion.k_idEstacion)}} className={`w-full p-5 ${randomColor()} mb-4 rounded-md cursor-pointer transition-all hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl`} key={estacion.k_idEstacion}>
									<div className=''>
										<div>
											<p>{estacion.n_nombreEstacion}</p>
											<p className='text-sm'>{estacion.n_direccion}</p>
											<p className=''>{(5 - estacion.q_numeroBicicletas)} espacios disponibles.</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				</div>
			)}
		</div>
	);
};
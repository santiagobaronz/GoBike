import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Root';
import updateData from '../Auth/components/updateData';
import { IoBicycle, IoCalendarSharp } from "react-icons/io5";
import getEstaciones from '../components/getEstaciones';
import getHistorial from '../components/getHistorial';

export const Perfil = () => {
	const { isLoggedIn, userData, setUserData } = useContext(AuthContext);
	const [estacionesDisponibles, setEstacionesDisponibles] = useState([]);
	const [historialViajes, setHistorialViajes] = useState([])
	const navigate = useNavigate();

	const fetchUserData = async () => {
		const newUserData = await updateData(userData.k_idUsuario);
		setUserData(newUserData);
	};

	const fetchEstaciones = async () => {
		const estaciones = await getEstaciones();
		setEstacionesDisponibles(estaciones);
	}

	const fetchHistorial = async () => {
		const historial = await getHistorial(userData.k_codigo);
		setHistorialViajes(historial);
	}

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login');
		} else {
			fetchUserData();
			fetchEstaciones();
			fetchHistorial();
		}
	}, [isLoggedIn, navigate]);

	const planColor = () => {
		switch (userData.k_idPlan) {
			case "PDI":
				return 'bg-daily';
			case "PME":
				return 'bg-monthly';
			case "PAN":
				return 'bg-yearly';
			case "PES":
				return 'bg-bg-color';
		}
	}

	const randomColor = () => {
		const elementos = ['bg-brown', 'bg-monthly', 'bg-yearly', 'bg-orange', 'bg-red'];
		const indiceAleatorio = Math.floor(Math.random() * elementos.length);
		return elementos[indiceAleatorio];
	}

	function formatDate(dateString) {
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		
		return `${year}-${month}-${day}`;
	  }

	return (
		<div className="p-16 w-full">
			<div>
				<h2 className='text-white-color text-2xl font-semibold'>Hola, {userData.n_nombre1}.</h2>
				<div className='flex gap-x-5'>
					<p className={`p-2 w-1/2 text-[15px] text-center text-white-color mt-4 rounded-md ${planColor()} `}>{userData.n_planServicio}</p>
					<p className={`p-2 w-1/2 text-[15px] text-center text-white-color mt-4 rounded-md bg-purple-color `}>Saldo: ${userData.v_saldoFinal}</p>
				</div>
			</div>
			<div className='mt-8 text-text-color'>
				{estacionesDisponibles.length > 0 ? (
					<div>
						<div className='flex items-center'>
							<IoBicycle className='mr-2 text-lg'></IoBicycle>
							<h2 className='text-lg'>Hacer nuevo viaje</h2>
						</div>
						<p className='mt-1 ml-1 text-[15px]'>Estaciones disponibles para viajar:</p>
						<ul className='mt-4'>
							{estacionesDisponibles.map((estacion) => (
								<li className={`w-full p-5 ${randomColor()} mb-4 rounded-md cursor-pointer transition-all hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl`} key={estacion.k_idEstacion}>
									<Link to={`/nuevo-viaje/${estacion.k_idEstacion}`} state={{ idEstacion: estacion.k_idEstacion }} >
										<div className='flex justify-between items-center'>
											<div>
												<p>{estacion.n_nombreEstacion}</p>
												<p className='text-sm'>{estacion.n_direccion}</p>
											</div>
											<div className='bg-white-color rounded-full w-9 h-9 flex justify-center items-center'>
												<p className='text-bg-color font-semibold text-center'>{estacion.q_numeroBicicletas}</p>
											</div>
										</div>
									</Link>
								</li>
							))}
						</ul>
					</div>
				) : (
					<div>
						<p className='bg-purple-darker-color text-center p-3 rounded-md mt-5'>No hay bicicletas disponibles</p>
					</div>
				)}


				<div className='flex items-center mt-10'>
					<IoCalendarSharp className='mr-2 text-lg'></IoCalendarSharp>
					<h2 className='text-lg'>Historial de viajes</h2>
				</div>
				<p className='mt-1 ml-1 text-[15px]'>Tu recuento de viajes:</p>
				{historialViajes.length > 0 ? (
					<div>
						<ul className='mt-4'>
							{historialViajes.map((viaje) => (
								<li
									className={`w-full p-5 ${randomColor()} mb-4 rounded-md cursor-pointer transition-all hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-xl`}
									key={viaje.k_idViaje}
								>
									<div className='flex justify-between items-center'>
										<div>
											<p className='text-sm'>{viaje.estacion_desbloqueo_nombre}</p>
											<p className='text-sm'>{viaje.estacion_bloqueo_nombre}</p>
											<p className='text-sm'>{formatDate(viaje.f_desbloqueo)}</p>
											<p className='text-sm'>Precio por viaje: ${viaje.v_total}</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				) : (
					<div>
						<p className='bg-purple-darker-color text-center p-3 rounded-md mt-5'>No hay viajes realizados</p>
					</div>
				)}
			</div>
		</div>
	);
};
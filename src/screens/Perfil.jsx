import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Root';
import updateData from '../Auth/components/updateData';
import { IoBicycle } from "react-icons/io5";
import getEstacionesAPI from '../components/getEstaciones';

export const Perfil = () => {
	const { isLoggedIn, userData, setUserData } = useContext(AuthContext);
	const [estacionesDisponibles, setEstacionesDisponibles] = useState([]);
	const navigate = useNavigate();

	const fetchUserData = async () => {
		const newUserData = await updateData(userData.k_idUsuario);
		console.log(newUserData)
		setUserData(newUserData);
	};

	const fetchEstaciones = async () => {
		const estaciones = await getEstacionesAPI();
		setEstacionesDisponibles(estaciones);
	}

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/login');
		} else {
			fetchUserData();
			fetchEstaciones();
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
								<li
									className={`w-full p-5 ${randomColor()} mb-4 rounded-md cursor-pointer transition-all hover:translate-x-1 hover:-translate-y-1 hover:shadow-xl`}
									key={estacion.k_idEstacion}
								>
									<div className='flex justify-between items-center'>
										<div>
											<p>{estacion.n_nombreEstacion}</p>
											<p className='text-sm'>{estacion.n_direccion}</p>
										</div>
										<div className='bg-white-color rounded-full w-9 h-9 flex justify-center items-center'>
											<p className='text-bg-color font-semibold text-center'>{estacion.q_numeroBicicletas}</p>
										</div>
									</div>
								</li>
							))}
						</ul>
					</div>
				) : (
					<div>
						<p className='bg-purple-darker-color text-center p-3 rounded-md mt-5'>No hay estaciones disponibles</p>
					</div>
				)}
			</div>
		</div>
	);
};
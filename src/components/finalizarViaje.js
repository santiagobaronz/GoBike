const finalizarNuevoViaje = async (userData, estacionCierre) => {

	const dataToSend = { ...userData, ...estacionCierre };

	try {
		const response = await fetch('http://localhost:3000/finalizarViaje', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ dataToSend }),
		});

		if (response.ok) {
			const data = await response.json();
			if (data) {
				return data[0];
			} else {
				return false;
			}
		} else {
			return false;
		}
	} catch (error) {
		return false;
	}

}

export default finalizarNuevoViaje;
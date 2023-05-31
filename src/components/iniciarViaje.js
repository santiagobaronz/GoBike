const iniciarNuevoViaje = async (userData, estacionData) => {

	const dataToSend = { ...userData, ...estacionData };

	try {
		const response = await fetch('http://localhost:3000/iniciarViaje', {
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

export default iniciarNuevoViaje;
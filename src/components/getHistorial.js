export const getHistorial = async (k_codigo) => {

	try {
	  const response = await fetch('http://localhost:3000/historial', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ k_codigo }),
	  });
  
	  if (response.ok) {
		const data = await response.json();
		if (data) {
		  return data;
		} else {
		  return false;
		}
	  } else {
		return false;
	  }
	} catch (error) {
	  return false;
	}
  };

export default getHistorial;

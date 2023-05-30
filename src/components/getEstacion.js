const getEstacion = async (estacionID) => {
	try {
	  const response = await fetch('http://localhost:3000/getEstacion', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ estacionID }),
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
  };

export default getEstacion;

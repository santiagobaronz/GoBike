const registerUserDB = async (formData) => {
	try {
	  const response = await fetch('http://localhost:3000/register', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	  });
  
	  if (response) {
		const data = await response.json();
		return data;
	  } else {
		throw new Error('Error al enviar los datos al servidor');
	  }
	} catch (error) {
	  return true
	}
  }

export default registerUserDB;
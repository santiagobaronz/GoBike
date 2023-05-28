const registerUserDB = async (formData) => {
	try {
	  const response = await fetch('http://localhost:3000/register', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(formData)
	  });
  
	  if (response.ok) {
		const data = await response.json();
		if(data.code != undefined){
			if(data.code == 23505){
				return 'dup'
			}
		}
	  } else {
		throw new Error('Error al enviar los datos al servidor');
	  }
	} catch (error) {
	  return 'ok'
	}
  }

export default registerUserDB;
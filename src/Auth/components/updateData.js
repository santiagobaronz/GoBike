const updateData = async (userID) => {
	try {
	  const response = await fetch('http://localhost:3000/getUser', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userID }), // Envuelve userID en un objeto
	  });
  
	  if (response.ok) {
		const data = await response.json();
		if (data) {
		  return data;
		} else {
		  // Inicio de sesión fallido
		  return false;
		}
	  } else {
		return false;
	  }
	} catch (error) {
	  return false;
	}
  };

export default updateData;

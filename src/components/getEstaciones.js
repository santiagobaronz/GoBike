const updateData = async (userID) => {
	try {
	  const response = await fetch('http://localhost:3000/getEstacionesConBicicletas', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ userID }),
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

export default updateData;

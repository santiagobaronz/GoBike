const loginUser = async (userData) => {
	try {
	  const response = await fetch('http://localhost:3000/login', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(userData)
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
  
  export default loginUser;
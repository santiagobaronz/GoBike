import React from 'react'

export const NuevoViaje = (idEstacion) => {

	const { isLoggedIn, userData, setUserData } = useContext(AuthContext);
	
	const fetchUserData = async () => {
		const newUserData = await updateData(userData.k_idUsuario);
		console.log(newUserData)
		setUserData(newUserData);
	};

  return (
	<div>NuevoViaje</div>
  )
}

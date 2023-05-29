import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Root';
import updateData from '../Auth/components/updateData';

export const Perfil = () => {
  const { isLoggedIn, userData, setUserData } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const newUserData = await updateData(userData.k_idUsuario);
    setUserData(newUserData);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else {
		console.log(userData)
      fetchUserData();
    }
  }, [isLoggedIn, navigate]);

  const planColor = () => {
	switch (userData.k_idPlan){
		case 1:
			return 'bg-daily'
		case 2:
			return 'bg-monthly'
		case 3:
			return 'bg-yearly'
	}
  }

  return (
    <div className="p-16">
      <h2 className='text-white-color text-2xl font-semibold'>Hola, {userData.n_nombre1}.</h2>
	  <span className={`p-3 ${planColor} `}>Plan {}</span>
    </div>
  );
};
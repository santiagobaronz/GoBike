import { createContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import updateData from "./Auth/components/updateData";

export const AuthContext = createContext();

export const Root = () => {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState([]);
	const navigate = useNavigate();

	
	const fetchUserData = async (sesionGuardada) => {
		const { userID } = JSON.parse(sesionGuardada);
		const newUserData = await updateData(userID);
		setUserData(newUserData);
		setIsLoggedIn(true)
	}

	useEffect(() => {
		const sesionGuardada = localStorage.getItem('sesion');
		if (!sesionGuardada) {
			navigate('/login');
		} else {
			fetchUserData(sesionGuardada);
		}
	}, [isLoggedIn, navigate]);

		return (
			<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
				<div id='content' className="bg-app-color flex w-full max-h-[800px] min-h-[800px] overflow-hidden rounded-2xl">
					<Outlet />
				</div>
			</AuthContext.Provider>
		)

	}
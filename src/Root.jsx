import { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const AuthContext = createContext();

export const Root = () => {

	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userData, setUserData] = useState([]);

	return (
		<AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userData, setUserData }}>
			<div id='content' className="bg-app-color flex w-full max-h-[800px] min-h-[800px] overflow-hidden rounded-2xl">
				<Outlet />
			</div>
		</AuthContext.Provider>
	)

}
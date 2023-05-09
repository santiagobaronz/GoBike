import { Outlet } from "react-router-dom";

export const Root = () => {
	return (
		<>
			<div id='content' className="bg-app-color flex w-full h-5/6 overflow-hidden rounded-2xl">
				<Outlet />
			</div>
		</>
	)

}
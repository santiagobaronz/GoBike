import { Outlet } from "react-router-dom";

export const Root = () => {
	return (
		<>
			<div id='content' className="bg-app-color flex w-full max-h-[800px] min-h-[800px] overflow-hidden rounded-2xl">
				<Outlet />
			</div>
		</>
	)

}
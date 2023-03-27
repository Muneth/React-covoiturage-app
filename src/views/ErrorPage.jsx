import React from "react";
import PageComponent from "../components/PageComponent";

import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();

	let title = " An error occured";
	let message = "Something went wrong";

	if (error.status === 500) {
		title = "Server error";
		message = error.data.message;
	}

	if (error.status === 404) {
		title = "Not found";
		message = "The requested page was not found";
	}

	return (
		<PageComponent title={title}>
			<div className='container flex flex-col items-center justify-center w-full mx-auto'>
				<h1 className='text-3xl font-bold tracking-tight text-gray-900'>
					{message}
				</h1>
			</div>
		</PageComponent>
	);
};

export default ErrorPage;

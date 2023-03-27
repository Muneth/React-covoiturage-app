import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../axios.js";
import PageComponent from "../components/PageComponent";

export default function Search() {
	const [villeDepart, setVilleDepart] = useState("");
	const [villeArrive, setVilleArrive] = useState("");
	const [date, setDate] = useState("");
	const [error, setError] = useState({ __html: "" });

	const navigate = useNavigate();

	const handleSubmit = async (event) => {
		event.preventDefault();

		let data = new FormData();
		data.append("villedepart", villeDepart);
		data.append("villearrive", villeArrive);
		// data.append("date", formData.date);

		async function searchTrip() {
			try {
				const response = await axiosClient.post("/api/trajet/search", data, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				console.log("data", response);
				navigate("/tripslist", { state: { trips: response.data } });
			} catch (error) {
				if (error.response) {
					const backendErrors = error.response.data;
					console.log(backendErrors);
					setError({ __html: backendErrors.join("<br />") });
				}
				console.log(error);
			}
		}
		searchTrip();
	};

	return (
		<PageComponent title='Rechercher un trajet'>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div>
						<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
							Mettez les info de votre trajet
						</h2>
						{error.__html && (
							<div
								className='mt-3 bg-red-500 rounded py-2 px-3 text-white'
								dangerouslySetInnerHTML={error}
							></div>
						)}
					</div>
					<form
						className='mt-8 space-y-6'
						onSubmit={handleSubmit}
						method='POST'
					>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								<label htmlFor='villedepart' className='sr-only'>
									Ville de départ
								</label>
								<input
									id='villedepart'
									name='villedepart'
									type='text'
									className='mb-8 relative block w-full rounded-t-md rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									placeholder='Ville de départ'
									value={villeDepart}
									onChange={(e) => setVilleDepart(e.target.value)}
								/>
							</div>
							<div>
								<label htmlFor='villearrive' className='sr-only'>
									Destination
								</label>
								<input
									id='villearrive'
									name='villearrive'
									type='text'
									className='mb-8 relative block w-full rounded-t-md rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									placeholder='Destination'
									value={villeArrive}
									onChange={(e) => setVilleArrive(e.target.value)}
								/>
							</div>
							{/* <div>
								<label htmlFor='date' className='sr-only'>
									Date
								</label>
								<input
									id='date'
									name='date'
									type='text'
									className=' mb-8 relative block w-full rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-300 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Date'
									// value={formData.date}
									// onChange={handleChange}
								/>
							</div> */}
						</div>
						<div>
							<button
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								<span className='absolute left-0 inset-y-0 flex items-center pl-3'>
									<svg
										className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
										xmlns='http://www.w3.org/2000/svg'
										viewBox='0 0 20 20'
										fill='currentColor'
										aria-hidden='true'
									>
										<path
											fillRule='evenodd'
											d='M3 6a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
											clipRule='evenodd'
										/>
									</svg>
								</span>
								Rechercher
							</button>
						</div>
					</form>
				</div>
			</div>
		</PageComponent>
	);
}

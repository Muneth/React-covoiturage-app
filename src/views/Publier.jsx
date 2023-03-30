import React from "react";
import PageComponent from "../components/PageComponent";
import { useState, useEffect } from "react";
import axiosClient from "../axios.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";
import { useNavigate } from "react-router-dom";

const Publier = () => {
	const { currentUserId } = useStateContext();
	const [villeDepart, setVilleDepart] = useState("");
	const [villeArrive, setVilleArrive] = useState("");
	const [date, setDate] = useState("");
	const [kms, setKms] = useState("");
	const [sucess, setSucess] = useState({ __html: "" });
	const [error, setError] = useState({ __html: "" });
	const [checkCar, setCheckCar] = useState(false);

	const navigate = useNavigate();

	const publish = async (e) => {
		e.preventDefault();
		setError({ __html: "" });

		let data = new FormData();
		data.append("villedepart", villeDepart);
		data.append("villearrive", villeArrive);
		data.append("date", date);
		data.append("kms", kms);

		async function publishTrip() {
			try {
				const response = await axiosClient.post(
					`/api/insertInscription/${currentUserId}`,
					data,
					{
						headers: {
							"Content-Type": "multipart/form-data",
						},
					},
				);
				console.log("data", response);
				setSucess({ __html: "Votre trajet a été publié" });
				navigate("/vostrajets");
			} catch (error) {
				if (error.response) {
					const backendErrors = error.response.data;
					console.log(backendErrors);
					setError({ __html: backendErrors.join("<br />") });
				}
				console.log(error);
			}
		}
		publishTrip();
	};

	// Check if the user is has voiture, if not then don't show the button to publish a trip and show a message to the user to add a voiture first to be able to publish a trip and show a button to redirect the user to the page to add a voiture.

	useEffect(() => {
		async function checkIfUserHasVoiture() {
			try {
				const response = await axiosClient.get(
					`/api/personne/${currentUserId}/voiture`,
				);
				console.log("data", response);
			} catch (error) {
				if (error.response) {
					const backendErrors = error.response.data;
					console.log(backendErrors);
					setCheckCar(true);
					setError({
						__html: "Vous devez ajouter une voiture avant de publier un trajet",
					});
				}
				console.log(error);
			}
		}
		checkIfUserHasVoiture();
	}, []);

	const addCar = (id) => {
		navigate("/profil");
	};

	return (
		<>
			{checkCar ? (
				<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
					<div className='w-full max-w-md space-y-8'>
						<div>
							<h2 className='text-center text-3xl font-bold tracking-tight text-gray-900'>
								Vous devez ajouter une voiture avant de publier un trajet
							</h2>
						</div>
						<div className='flex justify-center'>
							<button
								onClick={() => {
									addCar(currentUserId);
								}}
								type='submit'
								className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Ajouter une voiture
							</button>
						</div>
					</div>
				</div>
			) : (
				<PageComponent title='Publier votre trajet'>
					<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
						<div className='w-full max-w-md space-y-8'>
							<div>
								<h2 className='text-center text-3xl font-bold tracking-tight text-gray-900'>
									Mettez les info de votre trajet
								</h2>
								{error.__html ? (
									<div
										className='mt-3 bg-red-500 rounded py-2 px-3 text-white'
										dangerouslySetInnerHTML={error}
									></div>
								) : (
									<div
										className='mt-3 bg-green-500 rounded  px-3 text-white'
										dangerouslySetInnerHTML={sucess}
									></div>
								)}
							</div>
							<form
								onSubmit={publish}
								className='mt-6 space-y-6'
								action='#'
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
											required
											value={villeDepart}
											onChange={(e) => setVilleDepart(e.target.value)}
											className='mb-8 relative block w-full rounded-t-md rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											placeholder='Ville de départ'
										/>
									</div>
									<div>
										<label htmlFor='villearrive' className='sr-only'>
											villeArrive
										</label>
										<input
											id='villearrive'
											name='villearrive'
											type='text'
											required
											value={villeArrive}
											onChange={(e) => setVilleArrive(e.target.value)}
											className='mb-8 relative block w-full rounded-t-md rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
											placeholder='Destination'
										/>
									</div>
									<div>
										<label htmlFor='date' className='sr-only'>
											Date
										</label>
										<input
											id='date'
											name='date'
											type='text'
											// required
											value={date}
											onChange={(e) => setDate(e.target.value)}
											className=' mb-8 relative block w-full rounded-none rounded-t-md rounded-b-md border text-gray-900 border-gray-300 px-3 py-2 text-gray-300 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
											placeholder='Date'
										/>
									</div>
									<div>
										<label htmlFor='kms' className='sr-only'>
											Kms
										</label>
										<input
											id='kms'
											name='kms'
											type='text'
											required
											value={kms}
											onChange={(e) => setKms(e.target.value)}
											className=' mb-8 relative block w-full rounded-none rounded-t-md rounded-b-md border text-gray-900 border-gray-300 px-3 py-2 text-gray-300 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
											placeholder='Kms'
										/>
									</div>
								</div>

								<div>
									<button
										type='submit'
										// only redirect if the form is valid (no errors)
										// onClick={listOfTrips}
										className='group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
									>
										Valider
									</button>
								</div>
							</form>
						</div>
					</div>
				</PageComponent>
			)}
		</>
	);
};

export default Publier;

// export const loader = async (currentUserId) => {
// 	const response = await axiosClient.get(
// 		`/api/personne/${currentUserId}/voiture`,
// 	);
// 	return response.data;
// };

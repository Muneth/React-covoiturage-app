import PageComponent from "../components/PageComponent";
import { useState } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate, useParams } from "react-router-dom";

const CarDetails = () => {
	const { id } = useParams();

	const [marque, setMarque] = useState("");
	const [model, setModel] = useState("");
	const [immatriculation, setImmatriculation] = useState("");
	const [places, setPlaces] = useState("");
	const [error, setError] = useState({ __html: "" });

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new FormData();
		data.append("marque", marque);
		data.append("model", model);
		data.append("immatriculation", immatriculation);
		data.append("places", places);

		async function addCar() {
			try {
				const response = await axiosClient.post(`/api/voiture/${id}`, data);
				navigate("/profil");
			} catch (error) {
				if (error.response) {
					const backendErrors = error.response.data;
					console.log(backendErrors);
					setError({ __html: backendErrors });
				}
			}
		}
		addCar();
	};

	return (
		<PageComponent title='Publier votre trajet'>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div>
						<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
							Ajouter une voiture
						</h2>
						{error.__html && (
							<div
								className='mt-3 bg-red-500 rounded py-2 px-3 text-white'
								dangerouslySetInnerHTML={error}
							></div>
						)}
					</div>
					<form
						onSubmit={handleSubmit}
						className='mt-8 space-y-6'
						action='#'
						method='POST'
					>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								<label htmlFor='marque' className='sr-only'>
									Marque
								</label>
								<input
									id='marque'
									name='marque'
									type='text'
									required
									value={marque}
									onChange={(e) => setMarque(e.target.value)}
									className='mb-8 relative block w-full rounded-t-md rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									placeholder='Marque'
								/>
							</div>
							<div>
								<label htmlFor='model' className='sr-only'>
									Model
								</label>
								<input
									id='model'
									name='model'
									type='text'
									required
									value={model}
									onChange={(e) => setModel(e.target.value)}
									className='mb-8 relative block w-full rounded-t-md rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									placeholder='Model'
								/>
							</div>
							<div>
								<label htmlFor='immatriculation' className='sr-only'>
									Immatriculation
								</label>
								<input
									id='immatriculation'
									name='immatriculation'
									type='text'
									required
									value={immatriculation}
									onChange={(e) => setImmatriculation(e.target.value)}
									className=' mb-8 relative block w-full rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-600 sm:text-sm'
									placeholder='Immatriculation'
								/>
							</div>
							<div>
								<label htmlFor='places' className='sr-only'>
									Places
								</label>
								<input
									id='places'
									name='places'
									type='text'
									required
									value={places}
									onChange={(e) => setPlaces(e.target.value)}
									className=' mb-8 relative block w-full rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Number des places'
								/>
							</div>
						</div>
						<div>
							<button
								type='submit'
								className='group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Valider
							</button>
						</div>
					</form>
				</div>
			</div>
		</PageComponent>
	);
};

export default CarDetails;

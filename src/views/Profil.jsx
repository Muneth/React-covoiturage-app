import React from "react";
import PageComponent from "../components/PageComponent";
import { useState, useEffect } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useLoaderData, json, useNavigate, useParams } from "react-router-dom";

const Profil = () => {
	// get the user state from the context
	const { currentUserId } = useStateContext();
	const [user, setUser] = useState({});
	const [cars, setCars] = useState({});
	const [userFound, setUserFound] = useState(false);
	const [hasCar, setHasCar] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [UserInfos, setUserInfos] = useState("");
	const [error, setError] = useState({ __html: "" });

	const navigate = useNavigate();

	const addprofil = () => {
		// window.location.href = "/addprofil";
		navigate("/addprofil");
	};

	const editprofil = (id) => {
		// window.location.href = "/editprofil";
		navigate("/editprofil/" + id);
	};

	const addvoiture = (id) => {
		// window.location.href = "/addvoiture";
		navigate("/addvoiture/" + id);
	};

	const editvoiture = (id) => {
		// window.location.href = "/editvoiture";
		navigate("/editvoiture/" + id);
	};

	const deletevoiture = (idVoiture) => {
		// window.location.href = "/cardetails";
		if (window.confirm("Voulez-vous vraiment supprimer cette voiture ?")) {
			async function deleteVoiture() {
				try {
					const response = await axiosClient.delete(
						`/api/voiture/${idVoiture}`,
					);
					if (response.status === 200) {
						// alert("Voiture supprimée");
						window.location.reload();
					}
				} catch (error) {
					console.log(error);
				}
			}
			deleteVoiture();
		}
	};

	// async function to fetch User with axios and set it to user state and set timeout to 5s
	useEffect(() => {
		async function fetchUser() {
			setIsLoading(true);
			try {
				const response = await axiosClient.get(
					`/api/personne/user/${currentUserId}`,
				);
				setUser(response.data);
				setUserFound(true);
				setCars(response.data.voiture);
				setUserInfos("Vos Informations");
				console.log("response.data", response.data);
			} catch (error) {
				if (error.response) {
					const backendErrors = error.response.data;
					// console.log(backendErrors);
					setError({ __html: backendErrors.join("<br />") });
				}
			}
			setIsLoading(false);
		}
		fetchUser();
	}, []);

	let voiture = user.voiture;

	return (
		<PageComponent title='Profil'>
			<div className='overflow-hidden bg-white shadow sm:rounded-lg'>
				<div className='px-4 py-5 sm:px-6'>
					<h3 className='text-base font-semibold leading-6 text-gray-900'>
						{isLoading ? (
							<div className='bg-blue-500 rounded py-2 px-3 text-white'>
								Loading...
							</div>
						) : (
							""
						)}
						{error.__html ? (
							<div
								className='bg-red-500 rounded py-2 px-3 text-white'
								dangerouslySetInnerHTML={error}
							></div>
						) : (
							<div className='bg-green-500 rounded px-3 text-white'>
								{UserInfos}
							</div>
						)}
					</h3>
				</div>
				<div className='border-t border-gray-200'>
					<dl>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Nom</dt>
							<dd className='capitalize mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
								{user.nom}
							</dd>
						</div>
						<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Prenom</dt>
							<dd className='capitalize mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
								{user.prenom}
							</dd>
						</div>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Email</dt>
							<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
								{user.email}
							</dd>
						</div>
						<div className='bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Mobile</dt>
							<dd className='mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
								{user.tel}
							</dd>
						</div>
						<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Ville</dt>
							<dd className='capitalize mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
								{user.ville}
							</dd>
						</div>
						<div className='bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6'>
							<dt className='text-sm font-medium text-gray-500'>Voiture</dt>
							<dd className='capitalize mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0'>
								{/* render the voiture object as an array */}
								{voiture ? (
									voiture.map((voiture) => (
										// set the key to the id of the voiture
										<div key={voiture.id}>
											<div className='flex flex-col'>
												<div className='-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
													<div className='py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8'>
														<div className='shadow overflow-hidden border-b border-gray-200 sm:rounded-lg'>
															<table className='min-w-full divide-y divide-gray-200'>
																<thead className='bg-gray-50'>
																	<tr>
																		<th
																			scope='col'
																			className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
																		>
																			Modele
																		</th>
																		<th
																			scope='col'
																			className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
																		>
																			Immatriculation
																		</th>
																		<th
																			scope='col'
																			className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
																		>
																			Marque
																		</th>
																		<th
																			scope='col'
																			className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
																		>
																			Options
																		</th>
																	</tr>
																</thead>
																<tbody className='bg-white divide-y divide-gray-200'>
																	<tr>
																		<td className='px-6 py-4 whitespace-nowrap'>
																			<div className='flex items-center'>
																				<div className='ml-4'>
																					<div className='text-sm font-medium text-gray-900'>
																						{voiture.model}
																					</div>
																				</div>
																			</div>
																		</td>
																		<td className='px-6 py-4 whitespace-nowrap'>
																			<div className='text-sm text-gray-900'>
																				{voiture.immatriculation}
																			</div>
																		</td>
																		<td className='px-6 py-4 whitespace-nowrap'>
																			<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
																				{voiture.marque}
																			</span>
																		</td>
																		<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
																			<button
																				type='button'
																				onClick={() => {
																					deletevoiture(voiture.id);
																				}}
																				className='rounded-md mr-3 bg-red-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
																			>
																				Supprimer
																			</button>
																			{/* edit voiture */}
																			<button
																				type='button'
																				onClick={() => {
																					editvoiture(voiture.id);
																				}}
																				className='rounded-md ml-5 bg-indigo-500 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
																			>
																				Modifier
																			</button>
																		</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
									))
								) : (
									<p>Vous n'avez pas encore enregistrer votre voiture</p>
								)}
							</dd>
						</div>
					</dl>
				</div>
			</div>
			<div className='mt-6 flex items-center justify-end gap-x-6'>
				{!userFound ? (
					<button
						type='button'
						onClick={addprofil}
						className='rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Ajouter votre info
					</button>
				) : (
					<button
						type='button'
						onClick={() => {
							editprofil(user.id);
						}}
						className='rounded-md bg-amber-400 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600'
					>
						Mise à jour
					</button>
				)}

				{!user || cars == "" ? (
					<button
						type='button'
						onClick={() => {
							addvoiture(user.id);
						}}
						className='rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
					>
						Add Voiture
					</button>
				) : (
					""
				)}
			</div>
		</PageComponent>
	);
};

export default Profil;

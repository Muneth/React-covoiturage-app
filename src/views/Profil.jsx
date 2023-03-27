import React from "react";
import PageComponent from "../components/PageComponent";
import { useState, useEffect } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useLoaderData, json } from "react-router-dom";

const Profil = () => {
	// get the user state from the context
	const { currentUser, userToken, currentUserId } = useStateContext();
	const [user, setUser] = useState({});
	const [cars, setCars] = useState({});
	const [userFound, setUserFound] = useState(false);
	const [hasCar, setHasCar] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [UserInfos, setUserInfos] = useState("");
	const [error, setError] = useState({ __html: "" });

	const addprofil = () => {
		window.location.href = "/addprofil";
	};

	const editprofil = () => {
		window.location.href = "/editprofil";
	};

	const editcar = () => {
		window.location.href = "/cardetails";
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
				setUserInfos("Votre Information");
				// console.log("response.data", response.data);
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
										<div key={voiture.id}>
											<p>{voiture.marque}</p>
											<p>{voiture.modele}</p>
											<p>{voiture.immatriculation}</p>
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
						onClick={editprofil}
						className='rounded-md bg-amber-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600'
					>
						Mise à jour
					</button>
				)}

				<button
					type='button'
					onClick={editcar}
					className='rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600'
				>
					Voiture
				</button>
			</div>
		</PageComponent>
	);
};

export default Profil;

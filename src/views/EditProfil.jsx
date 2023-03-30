import React from "react";
import PageComponent from "../components/PageComponent";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useState, useEffect } from "react";
import axiosClient from "../axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useLoaderData, json, useNavigate, useParams } from "react-router-dom";

const EditProfil = () => {
	const { id } = useParams();

	useEffect(() => {
		async function fetchUser() {
			try {
				const response = await axiosClient.get(`/api/personne/${id}`);
				console.log(response.data);
				setNom(response.data.nom);
				setPrenom(response.data.prenom);
				setEmail(response.data.email);
				setTel(response.data.tel);
				setVille(response.data.ville);
			} catch (error) {
				console.log(error);
			}
		}
		fetchUser();
	}, []);

	const { currentUserId } = useStateContext();
	const [nom, setNom] = useState("");
	const [prenom, setPrenom] = useState("");
	const [email, setEmail] = useState("");
	const [tel, setTel] = useState("");
	const [ville, setVille] = useState("");
	const [error, setError] = useState({ __html: "" });

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = new URLSearchParams();
		// data.append("id_user", currentUserId);
		data.append("nom", nom);
		data.append("prenom", prenom);
		data.append("email", email);
		data.append("tel", tel);
		data.append("ville", ville);

		async function editUser() {
			try {
				const response = await axiosClient.put(
					`/api/personne/${currentUserId}`,
					data,
				);
				navigate("/profil");
			} catch (error) {
				if (error.response) {
					const backendErrors = error.response.data;
					console.log(backendErrors);
					setError({ __html: backendErrors.join("<br />") });
				}
			}
		}

		editUser();
	};

	const profil = () => {
		window.location.href = "/profil";
	};

	return (
		<PageComponent title='Modifier votre Info'>
			<form onSubmit={handleSubmit} action='#' method='PUT'>
				<div className='space-y-12'>
					<div className='border-b border-gray-900/10 pb-12'>
						<div className='mt-10 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6'>
							<div className='sm:col-span-3'>
								<label
									htmlFor='nom'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Nom
								</label>
								<div className='mt-2'>
									<input
										type='text'
										name='nom'
										id='nom'
										required
										value={nom}
										onChange={(e) => setNom(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:col-span-3'>
								<label
									htmlFor='prenom'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Prénom
								</label>
								<div className='mt-2'>
									<input
										type='text'
										name='prenom'
										id='prenom'
										required
										value={prenom}
										onChange={(e) => setPrenom(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>

							<div className='sm:col-span-4'>
								<label
									htmlFor='email'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Email
								</label>
								<div className='mt-2'>
									<input
										id='email'
										name='email'
										type='email'
										required
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
							<div className='sm:col-span-2 sm:col-start-1'>
								<label
									htmlFor='ville'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Ville
								</label>
								<div className='mt-2'>
									<input
										type='text'
										name='ville'
										id='ville'
										required
										value={ville}
										onChange={(e) => setVille(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
							<div className='sm:col-span-2'>
								<label
									htmlFor='tel'
									className='block text-sm font-medium leading-6 text-gray-900'
								>
									Téléphone
								</label>
								<div className='mt-2'>
									<input
										type='text'
										name='tel'
										id='tel'
										required
										value={tel}
										onChange={(e) => setTel(e.target.value)}
										className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className='mt-6 flex items-center justify-end gap-x-6'>
					<button
						type='submit'
						className='rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
					>
						Enregistrer
					</button>
					<button
						type='button'
						onClick={profil}
						className='text-sm font-semibold leading-6 text-gray-900'
					>
						Annuler
					</button>
				</div>
			</form>
		</PageComponent>
	);
};

export default EditProfil;

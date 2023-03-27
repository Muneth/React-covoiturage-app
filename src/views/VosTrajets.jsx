import React from "react";
import { useState, useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import PageComponent from "../components/PageComponent";
import TripDetails from "../components/TripDetails";
import axiosClient from "../axios";

const VosTrajets = () => {
	const { currentUser, userToken, currentUserId } = useStateContext();
	const [trips, setTrips] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState({ __html: "" });

	useEffect(() => {
		async function fetchTrips() {
			setIsLoading(true);
			try {
				const response = await axiosClient.get(
					`/api/listeInscriptions/${currentUserId}`,
				);
				setTrips(response.data);
				console.log("response.data", response.data);
			} catch (error) {
				console.log(error);
				if (error.response) {
					const backendErrors = error.response.data;
					console.log(backendErrors);
					setError({ __html: backendErrors.join("<br />") });
				}
			}
			setIsLoading(false);
		}
		fetchTrips();
	}, []);

	return (
		<PageComponent title='Vos trajets'>
			{/* Display errors */}
			{error.__html ? (
				<div
					className='bg-red-500 rounded py-2 px-3 text-white'
					dangerouslySetInnerHTML={error}
				></div>
			) : (
				""
			)}

			{/* Display loading message with tailwind classes */}
			{isLoading ? (
				<div className='bg-blue-500 rounded py-2 px-3 text-white'>
					Loading...
				</div>
			) : (
				""
			)}
			<div className='container flex flex-col items-center justify-center w-full mx-auto'>
				<ul className='flex flex-col'>
					{trips.map((trip) => (
						<TripDetails
							key={trip.id}
							depart={trip.villedepart}
							arrive={trip.villearrive}
							time={trip.date}
							kms={trip.kms}
						/>
					))}
				</ul>
			</div>
		</PageComponent>
	);
};

export default VosTrajets;

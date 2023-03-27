import { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import TripDetails from "../components/TripDetails";
import axiosClient from "../axios";

const AllTrips = () => {
	const [trips, setTrips] = useState([]);

	async function fetchTrips() {
		try {
			const response = await axiosClient.get("/api/trajet");
			setTrips(response.data);
			console.log("response.data", response.data);
		} catch (error) {
			console.log(error);
		}
	}

	useEffect(() => {
		fetchTrips();
	}, []);

	return (
		<PageComponent title='Liste De Votre Trajets'>
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

export default AllTrips;

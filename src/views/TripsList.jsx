import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageComponent from "../components/PageComponent";
import { useEffect, useState } from "react";
import TripDetails from "../components/TripDetails";

const TripsList = () => {
	const [haveTrips, setHaveTrips] = useState(false);

	const location = useLocation();

	const trips = location.state?.trips;

	const navigate = useNavigate();

	useEffect(() => {
		if (!trips) {
			navigate("/");
		} else {
			setHaveTrips(true);
		}
	}, [trips]);

	return (
		<PageComponent title='Votre Research'>
			{haveTrips ? (
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
			) : (
				<div className='container flex flex-col items-center justify-center w-full mx-auto'>
					<h1 className='text-2xl font-bold text-center text-gray-900'>
						Aucun trajets trouvés!
					</h1>
				</div>
			)}
		</PageComponent>
	);
};

export default TripsList;

import { useState, useEffect } from "react";
import PageComponent from "../components/PageComponent";
import TripDetails from "../components/TripDetails";
import axiosClient from "../axios";
import { useLoaderData, json } from "react-router-dom";

const AllTrips = () => {
	const trips = useLoaderData();
	// const trips = useLoaderData((data) => data.trips);

	return (
		<PageComponent title='Trajets'>
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

export const loader = async () => {
	const response = await axiosClient.get("/api/trajet");
	if (!response.status === 200) {
		return json({ message: "Failed to fetch trips" }, { status: 500 });
	} else {
		return response.data;
	}
};

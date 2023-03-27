import React, { useState } from "react";
import axios from "axios";

function DistanceCalculator() {
	const [origin, setOrigin] = useState("");
	const [destination, setDestination] = useState("");
	const [distanceInMiles, setDistanceInMiles] = useState(0);
	const [distanceInKilometers, setDistanceInKilometers] = useState(0);
	const [durationText, setDurationText] = useState("");
	const [durationMinutes, setDurationMinutes] = useState(0);

	const handleOriginChange = (e) => {
		setOrigin(e.target.value);
	};

	const handleDestinationChange = (e) => {
		setDestination(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.get(
				`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${origin}&destinations=${destination}&mode=driving&key=AIzaSyBqMthhe7z3RxVI5y5jynoO_GqsXxsGTCw`,
			);
			const data = response.data;
			if (data.status === "OK") {
				const distanceInMeters = data.rows[0].elements[0].distance.value;
				const durationInSeconds = data.rows[0].elements[0].duration.value;
				setDistanceInMiles(distanceInMeters / 1609.34);
				setDistanceInKilometers(distanceInMeters / 1000);
				setDurationText(data.rows[0].elements[0].duration.text);
				setDurationMinutes(durationInSeconds / 60);
			} else {
				console.log(data.error_message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='min-h-screen bg-gray-100 flex justify-center items-center'>
			<div className='bg-white p-8 rounded-lg shadow-md'>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label
							className='block text-gray-700 font-bold mb-2'
							htmlFor='origin'
						>
							Origin:
						</label>
						<input
							className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='origin'
							type='text'
							value={origin}
							onChange={handleOriginChange}
						/>
					</div>
					<div className='mb-4'>
						<label
							className='block text-gray-700 font-bold mb-2'
							htmlFor='destination'
						>
							Destination:
						</label>
						<input
							className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
							id='destination'
							type='text'
							value={destination}
							onChange={handleDestinationChange}
						/>
					</div>
					<button
						className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
						type='submit'
					>
						Calculate distance
					</button>
				</form>
				<div className='mt-4'>
					<p>Distance in miles: {distanceInMiles.toFixed(2)}</p>
					<p>Distance in kilometers: {distanceInKilometers.toFixed(2)}</p>
					<p>Duration text: {durationText}</p>
					<p>Duration in minutes: {durationMinutes.toFixed(2)}</p>
				</div>
			</div>
		</div>
	);
}

export default DistanceCalculator;

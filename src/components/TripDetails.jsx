import React from "react";

const TripDetails = ({ action, depart, arrive, time, kms }) => {
	return (
		<div>
			<li className='flex flex-row mb-2 border-gray-400'>
				<div className='shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4'>
					<di v className='flex-1 pl-1 md:mr-16'>
						<div className='font-medium dark:text-white'>{depart}</div>
						<div className=' h-2 w-2 border-x-2 border-teal-600 border-t-2 rounded-t-md '></div>
						<div className=' h-2 w-2 border-x-2 border-teal-600'></div>
						<div className=' h-2 w-2 border-x-2 border-teal-600'></div>
						<div className=' h-2 w-2 border-x-2 border-teal-600'></div>
						<div className=' h-2 w-2 border-x-2 border-teal-600'></div>
						<div className=' h-2 w-2 border-x-2 border-teal-600 border-b-2 rounded-b-md '></div>
						<div className='font-medium dark:text-white'>{arrive}</div>
					</di>
					<div className='flex-2 pl-1 md:mr-16'>
						<div className='text-xs text-gray-600 dark:text-gray-400 p-2'>
							{time}
						</div>
						<div className='text-s text-gray-600 dark:text-gray-400 p-2'>
							Distance : {kms} kms
						</div>
					</div>
					<button className='flex justify-end w-24 text-right'>
						<svg
							width='12'
							fill='currentColor'
							height='12'
							className='text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200'
							viewBox='0 0 1792 1792'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path d='M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z'></path>
						</svg>
					</button>
				</div>
			</li>
		</div>
	);
};

export default TripDetails;

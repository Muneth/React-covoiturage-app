import React from "react";
import PageComponent from "../components/PageComponent";

const VosTrajets = () => {
	return (
		<PageComponent title='Vos trajets'>
			<div className='container flex flex-col items-center justify-center w-full mx-auto'>
				<ul className='flex flex-col'>
					<li className='flex flex-row mb-2 border-gray-400'>
						<div className='shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4'>
							<div className='flex-1 pl-1 md:mr-16'>
								<div className='font-medium dark:text-white'>Lorient</div>
								<div className='text-sm text-gray-600 dark:text-gray-200'>
									to
								</div>
								<div className='font-medium dark:text-white'>Vannes</div>
							</div>
							<div className='text-xs text-gray-600 dark:text-gray-200'>
								6:00 AM
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
					<li className='flex flex-row mb-2 border-gray-400'>
						<div className='shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4'>
							<div className='flex-1 pl-1 md:mr-16'>
								<div className='flex-1 pl-1 md:mr-16'>
									<div className='font-medium dark:text-white'>Lorient</div>
									<div className='text-sm text-gray-600 dark:text-gray-200'>
										to
									</div>
									<div className='font-medium dark:text-white'>Vannes</div>
								</div>
							</div>
							<div className='text-xs text-gray-600 dark:text-gray-200'>
								8:00 AM
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
					<li className='flex flex-row mb-2 border-gray-400'>
						<div className='shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4'>
							{/* <div className='flex flex-col items-center justify-center w-10 h-10 mr-4'></div> */}
							<div className='flex-1 pl-1 md:mr-16'>
								<div className='flex-1 pl-1 md:mr-16'>
									<div className='font-medium dark:text-white'>Lorient</div>
									<div className='text-sm text-gray-600 dark:text-gray-200'>
										to
									</div>
									<div className='font-medium dark:text-white'>Vannes</div>
								</div>
							</div>
							<div className='text-xs text-gray-600 dark:text-gray-200'>
								10:00 AM
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
					<li className='flex flex-row mb-2 border-gray-400'>
						<div className='shadow border select-none cursor-pointer bg-white dark:bg-gray-800 rounded-md flex flex-1 items-center p-4'>
							{/* <div className='flex flex-col items-center justify-center w-10 h-10 mr-4'></div> */}
							<div className='flex-1 pl-1 md:mr-16'>
								<div className='flex-1 pl-1 md:mr-16'>
									<div className='font-medium dark:text-white'>Lorient</div>
									<div className='text-sm text-gray-600 dark:text-gray-200'>
										to
									</div>
									<div className='font-medium dark:text-white'>Vannes</div>
								</div>
							</div>
							<div className='text-xs text-gray-600 dark:text-gray-200'>
								14:00 AM
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
				</ul>
			</div>
		</PageComponent>
	);
};

export default VosTrajets;

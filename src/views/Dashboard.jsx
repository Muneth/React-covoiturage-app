import PageComponent from "../components/PageComponent";
import { LockClosedIcon } from "@heroicons/react/20/solid";

export default function Dashboard() {
	const listOfTrips = () => {
		window.location.href = "/tripslist";
	};

	return (
		<PageComponent title='Rechercher un trajet'>
			<div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
				<div className='w-full max-w-md space-y-8'>
					<div>
						<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
							Mettez les info de votre trajet
						</h2>
					</div>
					<form className='mt-8 space-y-6' action='#' method='POST'>
						<input type='hidden' name='remember' defaultValue='true' />
						<div className='-space-y-px rounded-md shadow-sm'>
							<div>
								<label htmlFor='villedepart' className='sr-only'>
									Ville de départ
								</label>
								<input
									id='villedepart'
									name='villedepart'
									type='text'
									className='mb-8 relative block w-full rounded-t-md rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									placeholder='Ville de départ'
								/>
							</div>
							<div>
								<label htmlFor='destination' className='sr-only'>
									Password
								</label>
								<input
									id='destination'
									name='destination'
									type='text'
									className='mb-8 relative block w-full rounded-t-md rounded-b-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
									placeholder='Destination'
								/>
							</div>
							<div>
								<label htmlFor='date' className='sr-only'>
									Date
								</label>
								<input
									id='date'
									name='date'
									type='text'
									required
									// value={fullName}
									// onChange={(ev) => setFullName(ev.target.value)}
									className=' mb-8 relative block w-full rounded-none rounded-t-md rounded-b-md border border-gray-300 px-3 py-2 text-gray-300 placeholder-gray-400 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
									placeholder='Date'
								/>
							</div>
						</div>

						<div>
							<button
								type='button'
								onClick={listOfTrips}
								className='group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
							>
								Suivant
							</button>
						</div>
					</form>
				</div>
			</div>
		</PageComponent>
	);
}

import { Link } from "react-router-dom";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import axiosClient from "../axios.js";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Register() {
	const { setCurrentUser, setUserToken } = useStateContext();
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState({ __html: "" });
	const onSubmit = (e) => {
		e.preventDefault();
		setErrors({ __html: "" });

		let postData = new FormData();
		postData.append("username", username);
		postData.append("email", email);
		postData.append("password", password);

		// async function to send register data to backend with axios and setCurrentUser and setUserToken
		async function register() {
			try {
				const { data } = await axiosClient.post("/api/register", postData, {
					headers: {
						"Content-Type": "multipart/form-data",
					},
				});
				setCurrentUser(data);
				setUserToken(data.token);
				console.log("data", data);
			} catch (error) {
				if (error.response) {
					const backendErrors = error.response.data;
					console.log(backendErrors);
					setErrors({ __html: backendErrors.join("<br />") });
				}
				console.log(error);
			}
		}
		register();
	};

	return (
		<>
			<h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
				Register for free
			</h2>
			<p className='mt-2 text-center text-sm text-gray-600'>
				Or{" "}
				<Link
					to='/login'
					className='font-medium text-indigo-600 hover:text-indigo-500'
				>
					Login with your account
				</Link>
			</p>

			{errors.__html && (
				<div
					className='bg-red-500 rounded py-2 px-3 text-white'
					dangerouslySetInnerHTML={errors}
				></div>
			)}

			<form
				onSubmit={onSubmit}
				className='mt-8 space-y-6'
				action='#'
				method='POST'
			>
				<input type='hidden' name='remember' defaultValue='true' />
				<div className='-space-y-px rounded-md shadow-sm'>
					<div>
						<label htmlFor='username' className='sr-only'>
							Username
						</label>
						<input
							id='username'
							name='username'
							type='text'
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className='relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							placeholder='Username'
						/>
					</div>
					<div>
						<label htmlFor='email-address' className='sr-only'>
							Email address
						</label>
						<input
							id='email-address'
							name='email'
							type='email'
							autoComplete='email'
							required
							value={email}
							onChange={(ev) => setEmail(ev.target.value)}
							className='relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
							placeholder='Email address'
						/>
					</div>
					<div>
						<label htmlFor='password' className='sr-only'>
							Password
						</label>
						<input
							id='password'
							name='password'
							type='password'
							autoComplete='current-password'
							required
							value={password}
							onChange={(ev) => setPassword(ev.target.value)}
							className='relative block w-full appearance-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
							placeholder='Password'
						/>
					</div>
				</div>

				<div>
					<button
						type='submit'
						className='group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
					>
						<span className='absolute inset-y-0 left-0 flex items-center pl-3'>
							<LockClosedIcon
								className='h-5 w-5 text-indigo-500 group-hover:text-indigo-400'
								aria-hidden='true'
							/>
						</span>
						Register
					</button>
				</div>
			</form>
		</>
	);
}

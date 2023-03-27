import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Dashboard from "./views/Dashboard";
import Login from "./views/Login";
import Register from "./views/Register";
import VosTrajets from "./views/VosTrajets";
import Publier from "./views/Publier";
import Profil from "./views/Profil";
import EditProfil from "./views/EditProfil";
import TripsList from "./views/TripsList";
import Cartails from "./views/CarDetails";
import AllTrips from "./views/AllTrips";
import DistanceCalculator from "./views/CalculateDistance";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		children: [
			{
				path: "/dashboard",
				element: <Navigate to='/' />,
			},
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "/vostrajets",
				element: <VosTrajets />,
			},
			{
				path: "/publier",
				element: <Publier />,
			},
			{
				path: "/profil",
				element: <Profil />,
			},
			{
				path: "/editprofil",
				element: <EditProfil />,
			},
			{
				path: "/tripslist",
				element: <TripsList />,
			},
			{
				path: "/cardetails",
				element: <Cartails />,
			},
			{
				path: "/alltrips",
				element: <AllTrips />,
			},
			{
				path: "/distancecalculator",
				element: <DistanceCalculator />,
			},
		],
	},
	{
		path: "/",
		element: <GuestLayout />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/register",
				element: <Register />,
			},
		],
	},
]);

export default router;

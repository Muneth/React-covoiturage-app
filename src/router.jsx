import { createBrowserRouter, Navigate } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Search from "./views/Search";
import Login from "./views/Login";
import Register from "./views/Register";
import VosTrajets from "./views/VosTrajets";
import Publier from "./views/Publier";
import Profil from "./views/Profil";
import AddProfil from "./views/AddProfil";
import EditProfil from "./views/EditProfil";
import TripsList from "./views/TripsList";
import CarDetails from "./views/CarDetails";
import EditCar from "./views/EditCar";
import AllTrips, { loader as trips } from "./views/AllTrips";
import DistanceCalculator from "./views/CalculateDistance";
import ErrorPage from "./views/ErrorPage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <DefaultLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "/",
				element: <AllTrips />,
				loader: trips,
			},
			{
				path: "/search",
				element: <Search />,
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
				path: "/addprofil",
				element: <AddProfil />,
			},
			{
				path: "/editprofil/:id",
				element: <EditProfil />,
			},
			{
				path: "/tripslist",
				element: <TripsList />,
			},
			{
				path: "/addvoiture/:id",
				element: <CarDetails />,
			},
			{
				path: "/editvoiture/:id",
				element: <EditCar />,
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
		errorElement: <ErrorPage />,
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

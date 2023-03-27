import React, { createContext, useContext, useState } from "react";

const StateContext = createContext({
	currentUser: {},
	userToken: null,
	currentUserId: null,
	setCurrentUser: () => {},
	setUserToken: () => {},
	setCurrentUserId: () => {},
});

export const ContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState({});
	const [currentUserId, _setCurrentUserId] = useState(
		localStorage.getItem("USER_ID") || "",
	);
	const [userToken, _setUserToken] = useState(
		localStorage.getItem("TOKEN") || "",
	);
	const setUserToken = (token) => {
		if (token) {
			localStorage.setItem("TOKEN", token);
		} else {
			localStorage.removeItem("TOKEN");
		}
		_setUserToken(token);
	};

	const setCurrentUserId = (id) => {
		if (id) {
			localStorage.setItem("USER_ID", id);
		} else {
			localStorage.removeItem("USER_ID");
		}
		_setCurrentUserId(id);
	};

	return (
		<StateContext.Provider
			value={{
				currentUser,
				setCurrentUser,
				userToken,
				setUserToken,
				currentUserId,
				setCurrentUserId,
			}}
		>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);

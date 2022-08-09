import React, { createContext, useContext, useEffect, useState } from "react";
import userStorage from "storage/user";

interface IAuth {
	login?: (data?: any) => boolean;
	logout?: () => boolean;
	user?: any,
	signedIn?: boolean,
	children?: React.ReactNode,
}
const AuthContext = createContext<IAuth>({
	login: () => false,
	logout: () => false,
	user: {},
	children: '',
	signedIn: false,
});


export const AuthProvider: React.FC<IAuth> = ({ children }) => {

	const [user, setUser] = useState<any>({});
	const [signedIn, setSignedIn] = useState(false);

	useEffect(() => {
		if (userStorage.get()) {
			const info = JSON.parse(userStorage.get());
			setSignedIn(true);
			setUser(info);
		}
	}, []);

	const login = (data: any): boolean => {
		try {
			setUser(data);
			setSignedIn(true);
			userStorage.set(JSON.stringify(data));
			return true;
		} catch (e) {
			return false
		}
	}

	const logout = (): boolean => {
		try {
			setSignedIn(false);
			setUser({});
			userStorage.remove();
			return true;
		} catch (e) {
			return false
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				logout,
				signedIn
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;

export const useAuth = () => {
	return useContext(AuthContext);
}

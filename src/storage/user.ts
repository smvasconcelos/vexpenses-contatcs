import { localStorageKeys } from "constants/localstorage";
const userStorage = {
	remove: (): void => localStorage.removeItem(localStorageKeys.user),
	set: (value: string): void =>
		localStorage.setItem(localStorageKeys.user, value),
	get: (): string => localStorage.getItem(localStorageKeys.user) as string,
};

export default userStorage;

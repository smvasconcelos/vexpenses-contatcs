import axios from "axios";

const GoogleService = {
	/**
* Recebe o token de acesso e retorna os contatos do usuário
* @param accessToken token de acesso
* @returns boolean
*/
	getGoogleContacts: async (accessToken: string) => {
		return await axios.get(`https://people.googleapis.com/v1/people/me/connections?pageSize=1000&personFields=names,phoneNumbers,addresses,emailAddresses`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			}
		}).then(res => {
			return res.data;
		}).catch(e => {
			console.log(e);
		});
	},
	// getUserInfo: async (accessToken: string) => {
	// 	return await axios.get(`https://people.googleapis.com/v1/people/me?personFields=clientData`, {
	// 		headers: {
	// 			Authorization: `Bearer ${accessToken}`,
	// 		}
	// 	}).then(res => {
	// 		return res.data;
	// 	}).catch(e => {
	// 		console.log(e);
	// 	});
	// }
}

export default GoogleService;

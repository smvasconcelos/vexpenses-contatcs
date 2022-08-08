import axios from "axios";

const GoogleService = {
	getGoogleContacts: async (accessToken: string) => {
		return await axios.get(`https://people.googleapis.com/v1/people/me/connections?pageSize=1000&sortOrder=FIRST_NAME_ASCENDING&personFields=names,phoneNumbers,addresses,emailAddresses`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			}
		}).then(res => {
			return res.data;
		}).catch(e => {
			console.log(e);
		});
	}
}

export default GoogleService;

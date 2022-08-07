import { handleApi } from "services/server/server";

const MailService = {
	getAddress: async (cep: number) => {
		return await handleApi(`/${cep}/json`, 'get', {});
	}
};

export default MailService;

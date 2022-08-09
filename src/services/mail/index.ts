import { handleApi } from "services/server/server";

interface Viacep {
	bairro: string;
	cep: string;
	complemento: string;
	ddd: string;
	gia: string;
	ibge: string;
	localidade: string;
	logradouro: string;
	siafi: string;
	uf: string;
	erro: boolean;
}

const MailService = {
	/**
	* Recebe um cep e retorna os dados da localização
	* @param cep cep do local
	* @returns objeto com os dados do local
	*/
	getAddress: async (cep: number): Promise<Viacep> => {
		return await handleApi(`/${cep}/json`, 'get', {});
	}
};

export default MailService;

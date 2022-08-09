import { addDoc, doc, getDoc, getDocs, setDoc, deleteDoc, query, orderBy } from "firebase/firestore";
import { firestore } from "services";
import { toast } from "react-toastify";

const db = firestore.collection("/contacts")

export interface IContactData {
	name: string;
	id?: string;
	phone: Array<string>;
	email: string;
	job: string;
	address: Array<object>;
	description: string;
}

class ContactService {

	/**
 * Recebe o ID do usuário e retorna todos os contatos do usuário
 * @param id googleId do usuário
 * @returns um Snapshot do banco de dados
 */
	getAll = async (id: string) => {
		return db.doc(id).collection("list").orderBy("name").get();
	}

	/**
	* Recebe uma coleção de dados e um googleId e os adiciona na lista de contatos do usuário
	* @param data IContactData do contato
	* @param id googleId do usuário
	* @returns boolean
	*/
	add = async (data: any, id: string) => {
		try {
			await db.doc(id).collection("list").add(data);
			toast.success('Contato adicionado com sucesso.');
			return true;
		} catch (e) {
			toast.error('Erro ao adicionar contato');
			console.log(e);
			return false;
		}
	}

	/**
	* Recebe uma coleção de dados e um googleId e os adiciona na lista de contatos do usuário
	* @param data IContactData do contato
	* @param id id do contato
	* @param userId googleId do usuário
	* @returns boolean
	*/
	update = async (id: string, data: IContactData | any, userId: string) => {
		return await db.doc(userId).collection("list").doc(id).set(data).then(() => {
			toast.success('Contato atualizado com sucesso.');
			return true;
		}).catch((e) => {
			toast.error('Erro ao atualizar contato adicionado com sucesso.');
			return false;
		});
	}

	/**
	* Recebe o id do usuário e o id do contato a ser removido
	* @param id id do contato
	* @param userId googleId do usuário
	* @returns boolean
	*/
	remove = async (id: string, userId: string) => {
		return await db.doc(userId).collection("list").doc(id).delete().then(() => {
			toast.success('Contato removido com sucesso.');
			return true;
		}).catch((e) => {
			toast.error('Erro ao remover o contato.');
			return false;
		});
	}

	/**
	* Recebe os contatos retornados pelo google , e o googleId do usuário e os adiciona na coleção de contatos
	* @param data dados do google
	* @param userId googleId do usuário
	* @returns boolean
	*/
	handleGoogleImport = async (data: any, userId: string): Promise<any> => {
		if (data.totalItems === 0)
			return true;
		var firebaseData: Array<IContactData> = [];
		data.connections.map((connection: any) => {
			const userData: IContactData = {
				name: connection.names ? connection.names[0].displayName.toUpperCase() : "",
				phone: connection.phoneNumbers ? connection.phoneNumbers.map((phone: any) => phone.value) : [],
				email: connection.emailAddresses ? connection.emailAddresses[0].value : "",
				job: "",
				address: connection.addresses ? connection.addresses.map((address: any) => {
					return {
						street: address.streetAddress,
						city: address.city,
						state: address.region,
						country: address.country,
						zip: address.postalCode
					}
				}).filter((address: any) => address.street !== undefined) : [],
				description: "",
			};
			firebaseData.push(userData);
		})

		var batch = firestore.batch();

		const saveBatch = (docs: any[]) => {
			docs.forEach((doc) => {
				var docRef = db.doc(userId).collection("list").doc();
				batch.set(docRef, doc);
			});
			return batch.commit();
		}

		return saveBatch(firebaseData);
	}

}

export default new ContactService();

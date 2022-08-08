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

	getAll = async (id: string) => {
		return db.doc(id).collection("list").get();
	}

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

	update = async (id: string, data: IContactData, userId: string) => {
		return await db.doc(userId).collection("list").doc(id).set(data).then(() => {
			toast.success('Contato atualizado com sucesso.');
			return true;
		}).catch((e) => {
			toast.error('Erro ao atualizar contato adicionado com sucesso.');
			return false;
		});
	}

	remove = async (id: string, userId: string) => {
		return await db.doc(userId).collection("list").doc(id).delete().then(() => {
			toast.success('Contato removido com sucesso.');
			return true;
		}).catch((e) => {
			toast.error('Erro ao remover o contato.');
			return false;
		});
	}

	handleGoogleImport = (data: any): boolean => {
		if (data.totalItems === 0)
			return true;

		data.connections.map((connectionArray: any) => {
			// const userData : IContactData
			console.log({ connectionArray });
		})
		return true;
	}

}

export default new ContactService();

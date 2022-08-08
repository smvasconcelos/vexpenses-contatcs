import { collection, addDoc, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "services";
import { toast } from "react-toastify";

const db = collection(firestore, "contacts");

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

	getAll = async () => {
		const querySnapshot = await getDocs(db);
		return querySnapshot;
	}

	get = async (id: string) => {
		const docRef = doc(db, "contacts", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			var data = docSnap.data();
			data.id = docSnap.data().id;
			return data;
		} else {
			return false;
		}
	}

	add = async (data: IContactData) => {
		try {
			const docRef = await addDoc(db, data);
			toast.success('Contato adicionado com sucesso.');
			return true;
		} catch (e) {
			toast.error('Erro ao adicionar contato');
			console.log(e);
			return false;
		}
	}

	update = async (id: string, data: IContactData) => {
		const docRef = doc(db, id);
		return await setDoc(docRef, data, 	{
			merge: true
		}).then(() => {
			toast.success('Contato atualizado com sucesso.');
			return true;
		}).catch((e) => {
			toast.error('Erro ao atualizar contato adicionado com sucesso.');
			return false;
		});
	}

	remove = async (id: string) => {
		const docRef = doc(db, id);
		return await await deleteDoc(docRef).then(() => {
			toast.success('Contato removido com sucesso.');
			return true;
		}).catch((e) => {
			toast.error('Erro ao remover o contato.');
			return false;
		});
	}

}

export default new ContactService();

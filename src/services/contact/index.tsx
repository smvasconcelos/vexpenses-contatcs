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
		const docRef = doc(db, "contacts", id);
		return await setDoc(docRef, data, {
			merge: true
		}).then(() => {
			console.log("Document successfully updated!");
			return true;
		}).catch((e) => {
			console.log("Error updating contact information");
			return false;
		});
	}

	remove = async (id: string) => {
		const docRef = doc(db, "contacts", id);
		return await await deleteDoc(docRef).then(() => {
			console.log("Document successfully updated!");
			return true;
		}).catch((e) => {
			console.log("Error updating contact information");
			return false;
		});
	}

}

export default new ContactService();

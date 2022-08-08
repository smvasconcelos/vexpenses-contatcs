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
		return db.doc(id).collection("list").orderBy("name").get();
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

	update = async (id: string, data: IContactData | any, userId: string) => {
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

	handleGoogleImport = async (data: any, userId: string): Promise<any> => {
		if (data.totalItems === 0)
			return true;
		var firebaseData: Array<IContactData> = [];
		data.connections.map((connection: any) => {
			const userData: IContactData = {
				name: connection.names[0].displayName.toUpperCase(),
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
				var docRef = db.doc(userId).collection("list").doc(); //automatically generate unique id
				batch.set(docRef, doc);
			});
			return batch.commit();
		}

		return saveBatch(firebaseData);
		// console.table(firebaseData);
		// return await db.doc(userId).collection("list").add(firebaseData).then((res) => {
		// 	return true;
		// }).catch(e => {
		// 	console.log(e);
		// 	return false;
		// });
	}

}

export default new ContactService();

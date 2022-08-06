import { collection, addDoc, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { firestore } from "services";

const db = collection(firestore, "contacts");

export interface IContactData {
	name: string;
	phone: object;
	email: string;
	job: string;
	address: object;
}

class ContactService {

	getAll = async () => {
		const querySnapshot = await getDocs(db);
		return querySnapshot.forEach((doc: any) => {
			console.log(doc.id, " => ", doc.data());
			return doc.data();
		});
	}

	get = async (id: string) => {
		const docRef = doc(db, "contacts", id);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			return docSnap.data();
		} else {
			return false;
		}
	}

	add = async (data: IContactData) => {
		try {
			const docRef = await addDoc(collection(db, "users"), data);
			console.log("Document written with ID: ", docRef.id);
			return true;
		} catch (e) {
			console.error("Error adding document: ", e);
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

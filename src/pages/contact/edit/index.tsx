import InputComponent from 'components/input';
import React, { useEffect, useState } from 'react';
import { ButtonContainer, Container, ContainerRight, Content, Description, Divider, Name, Title, UserCard } from './styles';
import UserTemplate from 'templates/user';
import ButtonComponent from 'components/button';
import AddressInput from 'components/input/address';
import { v4 as uuid } from 'uuid';
import Form from 'components/form';
import masks from 'lib/masks';
import ContactService, { IContactData } from "services/contact";
import { useNavigate, useParams } from 'react-router-dom';
import validator from 'lib/validator';
import { toast } from "react-toastify";

const EditContent: React.FC = () => {

	const [edit, showEdit] = useState(false);
	const [phoneList, setPhoneList] = useState<Array<any>>([]);
	const [addressList, setAddressList] = useState<Array<any>>([]);
	const [user, setUser] = useState<IContactData | any>();
	const requiredFields = ["name", "email", "job", "phone"];
	const navigate = useNavigate();
	const { userInfo } = useParams();

	useEffect(() => {
		setUser(JSON.parse(atob(userInfo || "")));
	}, [userInfo]);

	const formatForm = (data: any): IContactData => {

		const arrayToAddress = (data: Array<string>, keywords: Array<string>): object => {
			const address: any = {};
			keywords.forEach((keyword, index) => {
				address[keyword] = data[index];
			}
			);
			return address;
		}

		var returnData: any = {};
		const keywords = ["cep", "neighborhood", "complement", "street", "state", "city"];
		var addresses: any = {};
		var contacts: any = {};

		Object.keys(data).map((key: any) => {

			const match = key.includes("_") ? key.split("_")[0] : key;

			if (!keywords.join("").includes(match) && match !== "phone")
				returnData[key] = data[key];
			if (key.includes("_")) {
				const index = key.split("_")[1];
				if (key.includes("phone")) {
					if (Array.isArray(contacts[index]))
						contacts[index].push(data[key]);
					else {
						contacts[index] = data[key];
					}
				}
				else {
					if (Array.isArray(addresses[index]))
						addresses[index].push(data[key]);
					else {
						addresses[index] = [];
						addresses[index].push(data[key]);
					}
				}
			}
		});

		contacts["0"] = data["phone"];
		addresses = Object.values(addresses).map((address: any) => {
			if (address.every((item: string) => item !== ""))
				return arrayToAddress(address, keywords);
			else
				return false
		});
		addresses = addresses.filter((item: any) => item);

		returnData["phone"] = Object.values(contacts);
		returnData["address"] = addresses;
		if (!validator(returnData, requiredFields))
			toast.error('Todos os campos devem ser preenchidos para realizar esta ação.');
		return returnData;
	}

	const onSubmit = async (data: IContactData): Promise<void> => {
		const newData = formatForm(data);
		console.log("adding user");
		await ContactService.add(newData).then(res => {
			if (res)
				navigate("/search");
		});
	};

	const appendPhone = (): void => {
		const id = uuid();
		setPhoneList(prevList => [...prevList,
		<InputComponent mask={masks.cellphoneMask} remove={removePhone} append={appendPhone} key={`phone_${id}`} name={`phone_${id}`} label='Contato' />
		]);

	}

	const appendAddress = (): void => {
		const id = uuid();
		setAddressList(prevList => [...prevList,
		<AddressInput remove={removeAddress} append={appendAddress} key={id} name={id} label='Endereço' />
		]);

	}

	const removeAddress = (name: any): void => {
		setAddressList(prevList => prevList.filter((item) => {
			if (item.key !== name)
				return item;
			return false;
		}));
	}

	const removePhone = (name: any): void => {
		setPhoneList(prevList => prevList.filter((item) => {
			if (item.key !== name)
				return item;
			return false;
		}));
	}
	return (
		<Content>
			<UserCard>
				<Container onClick={() => showEdit(!edit)}>
					<Name>
						Samuel Mendonça Vasconcelos
					</Name>
					<Divider />
					<Description>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, vitae cum debitis error fuga, perferendis quos aliquam, consectetur sint quasi quia rem quibusdam tempora? Fugiat suscipit in reiciendis error quam.
					</Description>
				</Container>
				{
					edit && <ContainerRight>
						<Title>
							EDITAR USUÁRIO
						</Title>
						<Form onSubmit={onSubmit}>
							<InputComponent initialValue={user.name || ""} name="name" label='Nome' />
							<InputComponent initialValue={user.email || ""} name="email" label='Email' />
							<InputComponent
								append={appendPhone} mask={masks.cellphoneMask} add key={`phone`} name={`phone`} label='Contato' />
							{
								phoneList
							}
							<InputComponent initialValue={user.job || ""} name="job" label='Cargo' />
							<InputComponent initialValue={user.description || ""} name="description" label='Descrição' />
							<AddressInput append={appendAddress} add key={`address`} name={`0`} label='Endereço' />
							{
								addressList
							}
							<ButtonContainer>
								<ButtonComponent submit label='Salvar' />
							</ButtonContainer>
						</Form>
					</ContainerRight>
				}

			</UserCard>
		</Content>
	)
}

const EditContact: React.FC = () => {
	return (
		<UserTemplate children={<EditContent />} />
	);
};

export default EditContact;

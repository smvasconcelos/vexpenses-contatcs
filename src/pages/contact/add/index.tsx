import ButtonComponent from 'components/button';
import Form from 'components/form';
import InputComponent from 'components/input';
import AddressInput from 'components/input/address';
import validator from 'lib/validator';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { IContactData } from 'services/contact';
import UserTemplate from 'templates/user';
import masks from 'lib/masks';
import { v4 as uuid } from 'uuid';
import { ButtonContainer, ContainerRight, Content, Title, UserCard } from './styles';
import ContactService from "services/contact";
import { useNavigate } from 'react-router-dom';
import AuthContext from 'context/user';

const SearchContent: React.FC = () => {
	const [phoneList, setPhoneList] = useState<Array<any>>([]);
	const [addressList, setAddressList] = useState<Array<any>>([]);
	const requiredFields = ["name", "job", "phone"];
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);


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
		await ContactService.add(newData, user.data.googleId).then(res => {
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
				<ContainerRight>
					<Title>
						ADICIONAR CONTATO
					</Title>
					<Form onSubmit={onSubmit}>
						<InputComponent name="name" label='Nome' />
						<InputComponent name="email" label='Email' />
						<InputComponent
							append={appendPhone} mask={masks.cellphoneMask} add key={`phone`} name={`phone`} label='Contato' />
						{
							phoneList
						}
						<InputComponent name="job" label='Cargo' />
						<InputComponent name="description" label='Descrição' />
						<AddressInput append={appendAddress} add key={`address`} name={`0`} label='Endereço' />
						{
							addressList
						}
						<ButtonContainer>
							<ButtonComponent submit label='Salvar' />
						</ButtonContainer>
					</Form>
				</ContainerRight>
			</UserCard>
		</Content>
	)
}

const Search: React.FC = () => {
	return (
		<UserTemplate children={<SearchContent />} />
	);
};

export default Search;

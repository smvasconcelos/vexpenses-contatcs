import InputComponent from 'components/input';
import React, { useContext, useEffect, useState } from 'react';
import { ButtonContainer, Container, ContainerRight, Content, DeleteContactButton, Description, Divider, Name, Title, UserCard } from './styles';
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
import { TailSpin } from 'react-loader-spinner';
import theme from 'config/theme';
import removeIcon from "assets/icons/remove.svg";
import AuthContext from 'context/user';

const EditContent: React.FC = () => {

	const [edit, showEdit] = useState(false);
	const [phoneList, setPhoneList] = useState<Array<any>>([]);
	const [addressList, setAddressList] = useState<Array<any>>([]);
	const [userData, setUser] = useState<IContactData | undefined>();
	const [loading, setLoading] = useState(true);
	const { userInfo } = useParams();
	const requiredFields = ["name", "email", "job", "phone"];
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		const info: IContactData = JSON.parse(atob(userInfo || ""))
		setUser(info);
		setLoading(false);
		if (info.address.length > 1) {
			for (var i = 1; i < info.address.length; i++) {
				appendAddress(info.address[i]);
			}
		}
		if (info.phone.length > 1) {
			for (var d = 1; d < info.phone.length; d++) {
				appendPhone(info.phone[d]);
			}
		}
	}, [userInfo]);

	/**
	* Recebe os dados do formulario e os formata para o formato do banco de dados
	* @param data dados do form
	* @returns os dados formatados para o banco de dados
	*/
	const formatForm = (data: any): IContactData | boolean => {

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

		returnData["name"] = returnData.name.toUpperCase();
		returnData["phone"] = Object.values(contacts);
		returnData["address"] = addresses;

		console.log(returnData);
		if (!validator(returnData, requiredFields)) {
			toast.error('Todos os campos devem ser preenchidos para realizar esta ação.');
			return false;
		}
		return returnData;
	}

	const onSubmit = async (data: IContactData): Promise<void> => {
		const newData = formatForm(data);
		// console.log("adding user");
		if (!newData)
			return
		await ContactService.update(userData?.id || "", newData, user.data.googleId).then(res => {

		});
	};

	const appendPhone = (initialValue?: string): void => {
		const id = uuid();
		setPhoneList(prevList => [...prevList,
			<InputComponent initialValue={initialValue || ""} mask={masks.cellphoneMask} remove={removePhone} append={appendPhone} key={`phone_${id}`} name={`phone_${id}`} label='Contato' />
		]);

	}

	const appendAddress = (initialValue?: any): void => {
		const id = uuid();
		setAddressList(prevList => [...prevList,
			<AddressInput initialValue={initialValue} remove={removeAddress} append={appendAddress} key={id} name={id} label='Endereço' />
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

	const handleDeleteUser = async () => {
		if (window.confirm("Realmente deseja deletar este contato ?")) {
			await ContactService.remove(userData?.id || "", user.data.googleId).then(res => {
				if (res)
					navigate("/search");
			});
		}
	}

	return (
		<Content>
			{
				loading ?
					<TailSpin wrapperStyle={{ justifyContent: 'center', margin: '3em 0' }} color={theme.colors.active} height={35} width={35} />
					: <UserCard>
						<DeleteContactButton onClick={handleDeleteUser} src={removeIcon} />
						<Container onClick={() => showEdit(!edit)}>
							<Name>
								{userData?.name || ""}
							</Name>
							<Divider />
							<Description>
								{userData?.description || ""}
							</Description>
						</Container>
						{
							edit && <ContainerRight>
								<Title>
									EDITAR USUÁRIO
								</Title>
								<Form onSubmit={onSubmit}>
									<InputComponent initialValue={userData?.name} name="name" label='Nome' />
									<InputComponent initialValue={userData?.email} name="email" label='Email' />
									<InputComponent
										append={appendPhone} initialValue={userData?.phone[0]} mask={masks.cellphoneMask} add key={`phone`} name={`phone`} label='Contato' />
									{
										phoneList
									}
									<InputComponent initialValue={userData?.job} name="job" label='Cargo' />
									<InputComponent initialValue={userData?.description} name="description" label='Descrição' />
									<AddressInput initialValue={userData?.address[0]} name="address" append={appendAddress} add key={`address`} label=' Endereço' />
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
			}

		</Content>
	)
}

const EditContact: React.FC = () => {
	return (
		<UserTemplate children={<EditContent />} />
	);
};

export default EditContact;

import ButtonComponent from 'components/button';
import Form from 'components/form';
import InputComponent from 'components/input';
import React, { useCallback, useEffect, useState } from 'react';
import UserTemplate from 'templates/user';
import { ButtonContainer, ContainerRight, Content, Title, UserCard } from './styles';
import contact, { IContactData } from 'services/contact';
import validator from 'lib/validator';
import { v4 as uuid } from 'uuid';
import { toast } from "react-toastify"
import AddressInput from 'components/input/address';

const SearchContent: React.FC = () => {
	const [phoneList, setPhoneList] = useState<Array<any>>([]);
	const [addressList, setAddressList] = useState<Array<any>>([]);
	const onSubmit = (data: IContactData) => {
		console.log(data);
		if (!validator(data))
			toast.error('Todos os campos devem ser preenchidos para realizar esta ação.');
	};

	const appendPhone = () => {
		const index = uuid();
		setPhoneList(prevList => [...prevList,
		<InputComponent remove={removePhone} append={appendPhone} key={`phone_${index}`} name={`phone_${index}`} label='Contato' />
		]);

	}

	const appendAddress = () => {
		const index = uuid();
		setAddressList(prevList => [...prevList,
		<AddressInput remove={removeAddress} append={appendAddress} key={`address_${index}`} name={index} label='Endereço' />
		]);

	}

	const removeAddress = (name: any) => {
		var list = addressList;
		list = list.filter((item) => {
			if (item.key !== name)
				return item;
		});
		setAddressList(list);
	}

	const removePhone = (name: any) => {
		var list = phoneList;
		list = list.filter((item) => {
			if (item.key !== name)
				return item;
		});
		setPhoneList(list);
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
							append={appendPhone} add key={`phone`} name={`phone`} label='Contato' />
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

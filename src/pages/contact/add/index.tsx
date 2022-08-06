import ButtonComponent from 'components/button';
import Form from 'components/form';
import InputComponent from 'components/input';
import React from 'react';
import UserTemplate from 'templates/user';
import { ButtonContainer, ContainerRight, Content, Title, UserCard } from './styles';
import contact, { IContactData } from 'services/contact';
import validator from 'lib/validator';
import { toast } from "react-toastify"

const SearchContent: React.FC = () => {
	const onSubmit = (data: IContactData) => {

		console.log(data);
		if (validator(data))
			toast.error('Todos os campos devem ser preenchidos para realizar esta ação.');

		// contact.add(data);
	};
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
						<InputComponent name="phone" label='Contato' />
						<InputComponent name="job" label='Cargo' />
						<InputComponent name="address" label='Endereço' />
						<InputComponent name="description" label='Descrição' />
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

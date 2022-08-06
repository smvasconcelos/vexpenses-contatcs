import InputComponent from 'components/input';
import React, { useState } from 'react';
import { ButtonContainer, Container, ContainerRight, Content, Description, Divider, Name, Title, UserCard } from './styles';
import UserTemplate from 'templates/user';
import { Button } from 'components/button/styles';
import ButtonComponent from 'components/button';

const SearchContent: React.FC = () => {

	const [edit, showEdit] = useState(false);

	return (
		<Content>
			<UserCard>
				<ContainerRight>
					<Title>
						ADICIONAR CONTATO
					</Title>
					<InputComponent label='Nome' />
					<InputComponent label='Email' />
					<InputComponent label='Contato' />
					<InputComponent label='Cargo' />
					<InputComponent label='Endereço' />
					<InputComponent label='Descrição' />
				</ContainerRight>
			</UserCard>
			<ButtonContainer>
				<ButtonComponent label='Salvar' onclick={() => { }} />
			</ButtonContainer>
		</Content>
	)
}

const Search: React.FC = () => {
	return (
		<UserTemplate children={<SearchContent />} />
	);
};

export default Search;

import InputComponent from 'components/input';
import React, { useState } from 'react';
import { ButtonContainer, Container, ContainerRight, Content, Description, Divider, Name, Title, UserCard } from './styles';
import UserTemplate from 'templates/user';
import { Button } from 'components/button/styles';
import ButtonComponent from 'components/button';

const EditContent: React.FC = () => {

	const [edit, showEdit] = useState(false);

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
						<InputComponent label='Nome' />
						<InputComponent label='Email' />
						<InputComponent label='Contato' />
						<InputComponent label='Cargo' />
						<InputComponent label='Endereço' />
						<InputComponent label='Descrição' />
					</ContainerRight>
				}

			</UserCard>
			{
				edit &&
				<ButtonContainer>
					<ButtonComponent label='Salvar' onclick={() => { }} />
				</ButtonContainer>
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

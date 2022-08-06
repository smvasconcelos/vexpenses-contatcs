import InputComponent from 'components/input';
import React, { useEffect, useState } from 'react';
import { Container, SearchContainer, List, ListItem } from './styles';
import UserTemplate from 'templates/user';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import theme from 'config/theme';

const SearchContent: React.FC = () => {

	const navigate = useNavigate();
	const [contactList, setContactList] = useState<Array<{
		id: number,
		name: string,
		contact: string,
		job: string,
	}>>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			setContactList([
				{
					id: 1,
					name: 'Samuel Mendonça Vasconcelos',
					contact: '+55 73 9 99185 3260',
					job: 'Desenvolvedor Júnior',
				},
				{
					id: 2,
					name: 'Samuel Mendonça Vasconcelos 2',
					contact: '+55 73 9 99185 3262',
					job: 'Desenvolvedor Júniors',
				},
			]);
			setLoading(false);
		}, 2000);
	}, []);

	return (
		<Container>
			<SearchContainer>
				<InputComponent label={"Pesquisar"} />
			</SearchContainer>
			<List>
				{
					loading ?
						<TailSpin wrapperStyle={{ justifyContent: 'center', margin: '3em 0' }} color={theme.colors.active} height={35} width={35} />
						:
						contactList.length > 0 ? contactList.map((contact) => {
							return (
								<ListItem key={contact.id} onClick={() => navigate("/contact/edit")}>
									<span>{contact.name}</span >
									<span>{contact.contact}</span >
									<span>{contact.job}</span >
								</ListItem>
							)
						}) :
							<ListItem onClick={() => navigate("/contact/add")}>
								<span style={{ textAlign: 'center', width: '100%' }}>Nenhum contato cadastrado, clique aqui para adicionar seu primeiro contato</span >
							</ListItem>
				}
			</List>
		</Container>
	)
}

const Search: React.FC = () => {
	return (
		<UserTemplate children={<SearchContent />} />
	);
};

export default Search;

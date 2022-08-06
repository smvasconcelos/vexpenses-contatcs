import InputSearch from 'components/search';
import React, { useEffect, useState } from 'react';
import { Container, SearchContainer, List, ListItem } from './styles';
import UserTemplate from 'templates/user';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import theme from 'config/theme';
import FuzzySearch from 'fuzzy-search';

const SearchContent: React.FC = () => {

	const navigate = useNavigate();
	const [filteredList, setFilteredList] = useState<Array<{
		id: number,
		name: string,
		contact: string,
		job: string,
	}>>([]);
	const [contactList, setContactList] = useState<Array<{
		id: number,
		name: string,
		contact: string,
		job: string,
	}>>([]);
	const [loading, setLoading] = useState(true);

	const searcher = new FuzzySearch(contactList || [], ['name', 'email', 'contact', 'job', 'address'], {
		caseSensitive: false,
		sort: true,
	});

	const filterContact = (value: string) => {
		if (value === "") {
			setFilteredList(contactList);
			return;
		}
		setFilteredList(searcher.search(value));
	}

	useEffect(() => {
		setLoading(true);
		setTimeout(() => {
			const data = [
				{
					id: 1,
					name: 'Samuel Mendonça Vasconcelos',
					contact: '+55 73 9 99185 3260',
					job: 'Desenvolvedor Júnior',
					address: 'Rua qualquer numero 500, 45604 105'
				},
				{
					id: 2,
					name: 'Alanis Nogueira Rodrigues',
					contact: '+55 73 9 9 8868 3962',
					job: 'Desenvolvedor Júniors',
					address: 'Rua qualquer numero 500, 45604 105'
				},
				{
					id: 3,
					name: 'Samuel Nogueira Rodrigues',
					contact: '+55 73 9 9 8868 3962',
					job: 'Desenvolvedor Júniors',
					address: 'Rua qualquer numero 500, 45604 105'
				},
			]
			setContactList(data);
			setFilteredList(data);
			setLoading(false);
		}, 500);
	}, []);

	return (
		<Container>
			<SearchContainer>
				<InputSearch autoCompleteItems={contactList} onChange={filterContact} label={"Pesquisar"} />
			</SearchContainer>
			<List>
				{
					loading ?
						<TailSpin wrapperStyle={{ justifyContent: 'center', margin: '3em 0' }} color={theme.colors.active} height={35} width={35} />
						:
						filteredList.length > 0 ? filteredList.map((contact) => {
							return (
								<ListItem key={contact.id} onClick={() => navigate("/contact/edit")}>
									<span>{contact.name}</span >
									<span>{contact.contact}</span >
									<span>{contact.job}</span >
								</ListItem>
							)
						}) :
							contactList.length === 0 ?
								<ListItem onClick={() => navigate("/contact/add")}>
									<span style={{ textAlign: 'center', width: '100%' }}>Nenhum contato cadastrado, clique aqui para adicionar seu primeiro contato</span >
								</ListItem> :
								<ListItem>
									<span style={{ textAlign: 'center', width: '100%' }}>Nenhum resultado encontrado para esta pesquisa</span >
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

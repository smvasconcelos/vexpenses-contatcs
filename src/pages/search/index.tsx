import InputSearch from 'components/search';
import React, { useEffect, useState } from 'react';
import { Container, SearchContainer, List, ListItem } from './styles';
import UserTemplate from 'templates/user';
import { useNavigate } from 'react-router-dom';
import { TailSpin } from 'react-loader-spinner';
import theme from 'config/theme';
import FuzzySearch from 'fuzzy-search';
import ContactService, { IContactData } from "services/contact";

const SearchContent: React.FC = () => {

	const navigate = useNavigate();
	const [filteredList, setFilteredList] = useState<Array<IContactData>>([]);
	const [contactList, setContactList] = useState<Array<IContactData>>([]);
	const [loading, setLoading] = useState(true);

	const searcher = new FuzzySearch(contactList || [], ['name', 'email', 'contact', 'job', 'address', 'address.cep', 'address.neighborhood', 'address.complement', 'address.street', 'address.state', 'address.city', 'description'], {
		caseSensitive: false,
		sort: true,
	});

	const filterContact = (value: string): void => {
		if (value === "") {
			setFilteredList(contactList);
			return;
		}
		setFilteredList(searcher.search(value));
	}

	useEffect(() => {
		const getContacts = async () => {
			setLoading(true);
			await ContactService.getAll().then((querySnapshot) => {
				return querySnapshot.forEach((doc: any) => {
					var data = doc.data();
					data.id = doc.id;
					setContactList((prevState) => [...prevState, data]);
					setFilteredList((prevState) => [...prevState, data]);
					setLoading(false);
					return doc.data();
				});
			});
		}
		getContacts();
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
								<ListItem key={contact.id} onClick={() => navigate(`/contact/edit/${btoa(JSON.stringify(contact))}`)}>
									<span>{contact.name}</span >
									<span>{contact.phone[0]}</span >
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

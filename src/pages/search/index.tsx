import InputSearch from 'components/search';
import theme from 'config/theme';
import AuthContext from 'context/user';
import FuzzySearch from 'fuzzy-search';
import React, { useContext, useEffect, useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import ContactService, { IContactData } from "services/contact";
import UserTemplate from 'templates/user';
import { Container, List, ListItem, SearchContainer } from './styles';

const SearchContent: React.FC = () => {

	const navigate = useNavigate();
	const [filteredList, setFilteredList] = useState<Array<IContactData>>([]);
	const [contactList, setContactList] = useState<Array<IContactData>>([]);
	const [loading, setLoading] = useState(true);
	const { user } = useContext(AuthContext);
	// const [currentKey, setCurrentKey] = useState('');

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
			await ContactService.getAll(user.data.googleId).then((querySnapshot) => {
				// querySnapshot.onSnapshot((res: any) => {
				querySnapshot.docs.map((doc: any) => {
					var data = doc.data();
					data.id = doc.id;
					console.log(data.name);
					setContactList((prevState) => [...prevState, data]);
					setFilteredList((prevState) => [...prevState, data]);
					setLoading(false);
				});
				// });
				setLoading(false);
			});
		}
		getContacts();
	}, []);
	var currentKey: string = "";

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
							const name = contact.name.toUpperCase();
							const char = name[0] !== currentKey ? name[0] : "";
							currentKey = name[0] !== currentKey ? name[0] : currentKey;;
							return (
								<ListItem char={char} key={contact.id} onClick={() => navigate(`/contact/edit/${btoa(JSON.stringify(contact))}`)}>
									<span style={{ textTransform: 'uppercase' }}>{contact.name}</span >
									<span>{contact.phone[0]}</span >
									<span>{contact.job || "Não cadastrado"}</span >
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

import InputComponent from 'components/input';
import React from 'react';
import { Container, SearchContainer, List, ListItem } from './styles';
import UserTemplate from 'templates/user';
import { useNavigate } from 'react-router-dom';

const SearchContent: React.FC = () => {

	const navigate = useNavigate();

	return (
		<Container>
			<SearchContainer>
				<InputComponent label={"Pesquisar"} />
			</SearchContainer>
			<List>
				<ListItem onClick={() => navigate("/contact/edit")}>
					<span>Samuel Mendonça Vasconcelos</span >
					<span>+55 73 9 99185 3260</span >
					<span>Desenvolvedor Júnior</span >
				</ListItem>
				<ListItem onClick={() => navigate("/contact/edit")}>
					<span>Samuel Mendonça Vasconcelos</span >
					<span>+55 73 9 99185 3260</span >
					<span>Desenvolvedor Júnior</span >
				</ListItem>
				<ListItem onClick={() => navigate("/contact/edit")}>
					<span>Samuel Mendonça Vasconcelos</span >
					<span>+55 73 9 99185 3260</span >
					<span>Desenvolvedor Júnior</span >
				</ListItem>
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

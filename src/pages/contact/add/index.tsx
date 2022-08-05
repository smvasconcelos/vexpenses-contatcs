import InputComponent from 'components/input';
import React from 'react';
import { Container, SearchContainer } from './styles';
import UserTemplate from 'templates/user';

const SearchContent: React.FC = () => {
	return (
		<Container>
			<SearchContainer>
				<InputComponent label={"Pesquisar"} />
			</SearchContainer>
		</Container>
	)
}

const Search: React.FC = () => {
	return (
		<UserTemplate children={<SearchContent />} />
	);
};

export default Search;

import InputComponent from 'components/input';
import React from 'react';
import { Container, ListTable, ListTbody, ListTd, ListTr, ListThead, SearchContainer, Divider, ListTh } from './styles';
import UserTemplate from 'templates/user';

const SearchContent: React.FC = () => {
	return (
		<Container>
			<SearchContainer>
				<InputComponent label={"Pesquisar"} />
			</SearchContainer>
			<ListTable>
				<ListThead>
					<ListTr>
						<ListTh>
							Nome
						</ListTh>
						<ListTh>
							Contato
						</ListTh>
						<ListTh>
							Cargo
						</ListTh>
					</ListTr>
				</ListThead>
				<Divider />
				<ListTbody>
					<ListTr>
						<ListTd>
							Samuel Medonça Vasconcelos
						</ListTd>
						<ListTd>
							+55 73 9 9185 3260
						</ListTd>
						<ListTd>
							Desenvolvedor Júnior
						</ListTd>
					</ListTr>
					<ListTr>
						<ListTd>
							Samuel Medonça Vasconcelos
						</ListTd>
						<ListTd>
							+55 73 9 9185 3260
						</ListTd>
						<ListTd>
							Desenvolvedor Júnior
						</ListTd>
					</ListTr>
				</ListTbody>
			</ListTable>
		</Container>
	)
}

const Search: React.FC = () => {
	return (
		<UserTemplate children={<SearchContent />} />
	);
};

export default Search;

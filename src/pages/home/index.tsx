import React from 'react';
import Template from 'templates';
import { Container } from './styles';
import { LegendCard, LegendContainer, LegendText, LegendTitle, Title } from './styles';

const HomeContent: React.FC = () => {
	return (
		<Container>
			<Title>
				VEXPENSES <br /> CONTACTS
			</Title>
			<LegendContainer>
				<LegendCard>
					<LegendTitle>
						GERENCIE SEUS CONTATOS
					</LegendTitle>
					<LegendText>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et officiis adipisci sit id.
					</LegendText>
				</LegendCard>
				<LegendCard>
					<LegendTitle>
						GERENCIE SEUS CONTATOS
					</LegendTitle>
					<LegendText>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Et officiis adipisci sit id.
					</LegendText>
				</LegendCard>
			</LegendContainer>
		</Container>
	);
};

const Home: React.FC = () => {
	return (
		<Template children={<HomeContent />} />
	);
}

export default Home;

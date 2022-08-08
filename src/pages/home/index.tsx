import AuthContext from 'context/user';
import { gapi } from 'gapi-script';
import React, { useContext, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Template from 'templates';
import { Container, LegendCard, LegendContainer, LegendText, LegendTitle, LoginButtonContainer, Title } from './styles';

const HomeContent: React.FC = () => {
	const { user, login } = useContext(AuthContext);
	const navigate = useNavigate();

	const callback = async (response: any) => {
		if (login!({
			data: response.profileObj,
			accessToken: response.accessToken
		})) {
			toast.success('Login realizado com sucesso');
			navigate("/search");
		} else {
			toast.error('Erro ao realizar login, tente novamente');
		}
	}

	useEffect(() => {
		const start = () => {
			gapi.client.init({
				clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
				scope: 'https://www.googleapis.com/auth/contacts.readonly',
			});
		}
		gapi.load('client:auth2', start);
	}, []);

	return (
		<Container>
			<Title>
				VEXPENSES <br /> CONTATOS
			</Title>
			<LoginButtonContainer>
				<GoogleLogin
					clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
					buttonText="Login com google"
					onSuccess={callback}
					onFailure={() => {
						toast.error("Erro ao realizar login, tente novamente.");
					}}
					cookiePolicy={'single_host_origin'}
					theme={"dark"}

				/>
			</LoginButtonContainer>
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

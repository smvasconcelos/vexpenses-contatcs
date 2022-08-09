// import { GoogleLogin } from '@react-oauth/google';
import AuthContext from 'context/user';
import { gapi } from 'gapi-script';
import React, { useContext, useEffect } from 'react';
import GoogleLogin from 'react-google-login';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import Template from 'templates';
import { Container, GoogleIcon, LegendCard, LegendContainer, LegendText, LegendTitle, LoginButtonContainer, Title } from './styles';
import googleIcon from "assets/icons/google.svg";

const HomeContent: React.FC = () => {
	const { user, login } = useContext(AuthContext);
	const navigate = useNavigate();

	// Callback responsavel pelo login com o google
	const loginCallback = async (response: any) => {
		console.log(response);
		if (login!({
			data: response.profileObj,
			accessToken: response.accessToken
		})) {
			navigate("/search");
		} else {
			toast.error('Erro ao realizar login, tente novamente');
		}
	}

	// Inicia os scripts do google e prepara o escopo de login
	useEffect(() => {
		const start = () => {
			gapi.client.init({
				clientId: `${process.env.REACT_APP_GOOGLE_CLIENT_ID}`,
				scope: 'profile email https://www.googleapis.com/auth/contacts.readonly',
			});
		}
		gapi.load('client:auth2', start);
	}, []);

	return (
		<Container>
			<Title>
				VEXPENSES <br /> CONTATOS
			</Title>
			<GoogleLogin
				clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
				buttonText="Login com google"
				onSuccess={loginCallback}
				render={(renderProps) => {
					return (
						<LoginButtonContainer onClick={renderProps.onClick}>
							<GoogleIcon src={googleIcon} /> Login com google
						</LoginButtonContainer>
					)
				}}
				onFailure={() => {
					toast.error("Erro ao realizar login, tente novamente.");
				}}
				cookiePolicy={'single_host_origin'}
				theme={"dark"}
			/>

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

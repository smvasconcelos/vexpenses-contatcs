import { useGoogleLogin } from '@react-oauth/google';
import AuthContext from 'context/user';
import React, { useContext } from 'react';
import googleIcon from "assets/icons/google.svg";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import GoogleService from 'services/google';
import Template from 'templates';
import { Container, GoogleIcon, LegendCard, LegendContainer, LegendText, LegendTitle, LoginButtonContainer, Title } from './styles';

const HomeContent: React.FC = () => {
	const { user, login } = useContext(AuthContext);
	const navigate = useNavigate();

	const callback = async (response: any) => {
		const userData = await GoogleService.getUserInfo(response.access_token).catch(e => {
			return;
		});
		if (userData)
			if (login!({
				data: { googleId: userData.resourceName.split("/")[1] },
				accessToken: response.access_token
			})) {
				navigate("/search");
			} else {
				toast.error('Erro ao realizar login, tente novamente.');
			}
		else
			toast.error('Erro ao solicitar dados do usuário, tente novamente.');
	}

	const googleLogin = useGoogleLogin({
		onSuccess: callback,
		onError: () => {
			toast.error("Erro ao realizar login, tente novamente.");
		},
	});

	return (
		<Container>
			<Title>
				VEXPENSES <br /> CONTATOS
			</Title>
			<LoginButtonContainer onClick={googleLogin}>
				<GoogleIcon src={googleIcon} /> Login com google
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

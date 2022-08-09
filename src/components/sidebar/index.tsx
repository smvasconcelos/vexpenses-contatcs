import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavItem } from "./styles";
import logoutIcon from "assets/icons/logout.svg";
import addIcon from "assets/icons/add.svg";
import contactIcon from "assets/icons/contact.svg";
import menuIcon from "assets/icons/menu.svg";
import importIcon from "assets/icons/import.svg";
// import { GoogleLogout } from "react-google-login";
import AuthContext from "context/user";
import { toast } from "react-toastify";
import GoogleService from "services/google";
import ContactService from "services/contact";
import { googleLogout } from '@react-oauth/google';

const Sidebar: React.FC<{ user?: boolean }> = () => {

	const { logout } = useContext(AuthContext);
	const { user } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		googleLogout();
		if (logout!())
			navigate("/");
		else
			toast.error("Aconteceu um erro ao sair, tente novamente.");
	}

	const handleImport = async () => {
		if (window.confirm("Realmente deseja importar os seus contatos da sua conta google ?")) {
			await GoogleService.getGoogleContacts(user.accessToken).then(async (res) => {
				await ContactService.handleGoogleImport(res, user.data.googleId)
				toast.success("Contatos importados com sucesso.");
				navigate("/");
				window.location.reload();
			}).catch(e => {
				console.log(e);
				toast.error("Falha ao importar contatos do google.");
			});
		}
	}

	return (
		<Nav>
			<NavItem src={contactIcon} onClick={() => navigate("/search")} />
			<NavItem src={addIcon} onClick={() => navigate("/contact/add")} />
			<NavItem src={importIcon} onClick={handleImport} />
			<NavItem onClick={handleLogout} src={logoutIcon} />
		</Nav>
	)
}

export default Sidebar;

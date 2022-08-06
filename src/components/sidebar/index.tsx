import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavItem } from "./styles";
import addIcon from "assets/icons/add.svg";
import contactIcon from "assets/icons/contact.svg";
import menuIcon from "assets/icons/menu.svg";


const Sidebar: React.FC<{ user?: boolean }> = ({ user }) => {

	const navigate = useNavigate();

	return (
		<Nav>
			<NavItem src={menuIcon} onClick={() => navigate("/")} />
			<NavItem src={contactIcon} onClick={() => navigate("/search")} />
			<NavItem src={addIcon} onClick={() => navigate("/contact/add")} />
		</Nav>
	)
}

export default Sidebar;

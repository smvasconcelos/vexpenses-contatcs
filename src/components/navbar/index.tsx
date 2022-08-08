import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, NavItem } from "./styles";

const Navbar: React.FC<{ user?: boolean }> = ({ user }) => {

	const navigate = useNavigate();

	return (
		<Nav>
			<NavItem onClick={() => navigate("/")}>
				Home
			</NavItem>
			<NavItem onClick={() => navigate("/search	")}>
				Contatos
			</NavItem>
		</Nav>
	)
}

export default Navbar;

import styled from 'styled-components';
import theme from 'config/theme';

export const Nav = styled.nav`
	height: 5em;
	width: 100%;
	padding-right: 2em;
	display: flex;
	box-sizing: border-box;
	justify-content: end;
	align-items: center;
`;

export const NavItem = styled.a`
	text-decoration: none;
	text-transform: uppercase;
	color: ${theme.colors.icons};
	font-size: 1.1em;
	font-weight: bolder;
	margin-right: 1em;
	transition: all .2s ease-in-out;
	cursor: pointer;
	&:hover{
		color: ${theme.colors.active};
	}
`;

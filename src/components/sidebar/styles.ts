import styled from 'styled-components';
import theme from 'config/theme';

export const Nav = styled.nav`
	height: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	justify-content: start;
	padding: 1.5em;
	width: fit-content;
	align-items: center;
	background-color: #000000;
	/* position: absolute; */
	/* left: 0; */
	/* top: 0; */
`;

export const NavItem = styled.img`
	cursor: pointer;
	&:hover{
		color: ${theme.colors.active};
	}
	width: 25px;
	height: 25px;
	margin-top: 1em;
`;

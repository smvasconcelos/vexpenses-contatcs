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
	@media screen and (max-width: 1024px) {
		width: fit-content;
		height: auto;
		flex-direction: row;
		position: fixed;
		padding: 1em;
		top: 0%;
		border-bottom-right-radius: 5px;
		border-top-right-radius: 5px;
		z-index: 99;
		background-color: #00000090;
	}
`;

export const NavItem = styled.img`
	@media screen and (max-width: 1024px) {
		width: 20px;
		height: 20px;
		margin-top: 0;
		margin-left: 1em;
	}
	cursor: pointer;
	&:hover{
		color: ${theme.colors.active};
	}
	width: 25px;
	height: 25px;
	margin-top: 1em;
`;

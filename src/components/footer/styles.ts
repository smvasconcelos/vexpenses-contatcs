import styled from 'styled-components';
import theme from 'config/theme';

export const FooterContainer = styled.footer`
	height: 5em;
	background-color: ${theme.colors.footer};
	width: 100%;
	margin-top: auto;
	font-size: 12px;
	font-weight: bolder;
	color: #fff;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	justify-content: center;
	align-items: center;
`;

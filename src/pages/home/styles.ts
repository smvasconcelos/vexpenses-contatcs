import styled from "styled-components";
import theme from "config/theme";

export const HomePage = styled.p`
	background-color:  ${theme.colors.icons};
	font-family: 'Monsterrat';
	font-size: xx-large;
	font-weight: bolder;
	font-style: italic;
	z-index: 1;
`;

export const Title = styled.h1`
	color: white;
	font-weight: bolder;
	text-align: center;
	font-size: 4em;
	text-shadow: 2px 1px #ff0000;
	@media screen and (max-width: 1024px) {
		font-size: 3em;
	}
	@media screen and (max-width: 600px) {
		font-size: 1.5em;
	}
`

export const Container = styled.div`

	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: space-around;

`;


export const LegendContainer = styled.div`
	display: flex;
	box-sizing: border-box;
	width: 100%;
	justify-content: center;
	align-items: center;
	overflow: auto;
	@media screen and (max-width: 600px) {
		/* display: block; */
		flex-direction: column;
	}
`;

export const LegendCard = styled.div`
	display: flex;
	box-sizing: border-box;
	width: 30%;
	justify-content: space-around;
	align-items: center;
	padding: 2em;
	border-radius: 5px;
	background-color: ${theme.colors.legend};
	margin-right: 1em;
	@media screen and (max-width: 1024px) {
		/* font-size: .8em; */
		margin-right: 0;
		margin: 0 1em;
		width: 45%;
		padding: 1.5em;
	}
	@media screen and (max-width: 600px) {
		/* font-size: .8em; */
		margin-right: 0;
		margin: 1em 0;
		width: 80%;
		padding: 1.5em;
	}
`
export const LegendTitle = styled.h4`
	color: white;
	font-weight: bolder;
	padding-right: 1em;
	width: 30%;
	margin-right: 1.2em;
	border-right: 2px solid white;
	@media screen and (max-width: 600px) {
		font-size: .6em;
	}
`

export const LegendText = styled.span`
	color: white;
	font-size: small;
	font-weight: lighter;
	@media screen and (max-width: 600px) {
		font-size: .45em;
	}
`


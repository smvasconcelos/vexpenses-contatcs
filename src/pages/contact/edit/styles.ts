import styled, { keyframes } from "styled-components";
import theme from "config/theme";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	height: 100%;
	/* width: 35%; */
	width: auto;
	box-sizing: border-box;
	padding: 2em;
	@media screen and (max-width: 1024px) {
		padding: 1em;
	}
	@media screen and (max-width: 600px) {
		padding: 0;
	}

`;

export const SearchContainer = styled.div`
	width: 30%;
`
export const UserCard = styled.div`
	height: fit-content;
	background-color: rgba(0,0,0,.6);
	/* width: 35%; */
	padding: 1.5em;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	border-radius: 5px;
	@media screen and (max-width: 1024px) {
		flex-direction: column;
		justify-content: center;
	}
`
export const Divider = styled.div`
	width: 50%;
	height: 3px;
	background-color:  ${theme.colors.icons};
	border-radius: 5px;
	margin: 1em 0;
`

export const Description = styled.span`
	color: ${theme.colors.icons};
	font-style: italic;
	font-size: small;
	@media screen and (max-width: 600px) {
		font-size: .5em;
	}
`

export const Title = styled.h3`
	color: ${theme.colors.icons};
	font-weight: bolder;
	margin: 1em 0;
	@media screen and (max-width: 1024px) {
		font-size: .8em;
	}

`

export const Name = styled.h3`
	color: ${theme.colors.icons};
	font-weight: bolder;
	text-align: center;
	@media screen and (max-width: 1024px) {
		font-size: .8em;
	}
	@media screen and (max-width: 600px) {
		font-size: .6em;
	}
`

const slideAndFade = keyframes`
	from{
		opacity: 0;
		width: 0;
	}
	to{
		opacity: 1;
		width: 100%;
	}
`

export const ContainerRight = styled.div`
	height: fit-content;
	display: flex;
	flex-direction: column;
	width: 100%;
	animation: ${slideAndFade} .3s ease-in-out;
	/* justify-content: center; */
	/* align-items: center; */
`

export const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	height: 100%;
	min-width: fit-content;
	max-width: 100%;
	box-sizing: border-box;
	padding: 2em;
	overflow: auto;
	@media screen and (max-width: 1024px) {
		padding: 1em;
		display: block;
		min-width: 100%;
		/* justify-content: unset; */
		/* align-items: unset; */
	}
	@media screen and (max-width: 600px) {
		padding: .5em;
		/* justify-content: unset; */
		/* align-items: unset; */
	}
`

export const ButtonContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: row;
	box-sizing: border-box;
	justify-content: end;
	align-items: end;
`

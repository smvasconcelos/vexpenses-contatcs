import styled, { keyframes } from "styled-components";
import theme from "config/theme";

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	/* justify-content: center; */
	align-items: center;
	height: 100%;
	width: 100%;
	box-sizing: border-box;
	padding: 2em;
`;

export const SearchContainer = styled.div`
	width: 30%;
	@media screen and (max-width: 1024px) {
		width: 100%;
	}
`

export const List = styled.ul`
	list-style: none;
	overflow: auto;
	width: 100%;
	max-height: 70vh;
	padding: 0 .5em;
	position: relative;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
`


const fadeIn = keyframes`
	from{
		opacity: 0;
	}
	to{
		opacity: 1;
	}
`

export const ListItem = styled.li<{ char?: string | undefined }>`
	&:nth-child(2n + 1) {
		background-color: rgba(0,0,0,.2);
		/* box-shadow: 2px 2px 4px #ff000055; */
	}

	animation: ${fadeIn} .3s ease-in-out;
	cursor: pointer;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 95%;
	color: ${theme.colors.icons};
	font-weight: bolder;
	font-style: italic;
	font-size: .8em;
	margin: 1em 0;
	padding: 1em 2em;
	border-radius: 5px;
	transition: all .2s ease-in-out;
	border: 1px solid transparent;
	margin-left: .5em;
	@media screen and (max-width: 1024px) {
		padding: 1em;
		font-size: .6em;
		flex-direction: column;
		& > *{
			margin: .5em 0;
		}
	}
	@media screen and (max-width: 600px) {
		font-size: .5em;
	}
	&:hover{
		border: 1px solid rgba(255,255,255,.1);
	}
	&:before{
		content: "${props => props.char}";
		font-size: 1em;
		font-weight: bolder;
		color: ${theme.colors.icons};
		position: absolute;
		left: 0;
	}
`

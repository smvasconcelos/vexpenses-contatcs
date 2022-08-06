import styled from "styled-components";
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
`
export const ListItem = styled.li`
	&:nth-child(2n + 1) {
		background-color: rgba(0,0,0,.2);
	}
	cursor: pointer;
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	color: ${theme.colors.icons};
	font-weight: bolder;
	font-style: italic;
	font-size: .8em;
	margin: 1em 0;
	padding: 1em 2em;
	border-radius: 5px;
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
`

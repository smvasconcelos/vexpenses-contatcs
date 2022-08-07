import styled from "styled-components";
import theme from "config/theme";

export const Input = styled.input`
	all: unset;
	border-bottom: 1px solid rgba(255,255,255,.2);
	/* background-color: #cccccc10; */
	/* padding: 1em; */
	/* border-radius: 5px; */
	width: 100%;
	color: black;
	font-weight: 400;
	padding-bottom: .2em;
	color: rgba(255,255,255,.7);
	font-size: .8em;
	transition: border  .5s ease-in-out;
	@media screen and (max-width: 1024px) {
		font-size: .6em;
	}
	@media screen and (max-width: 600px) {
		font-size: .4em;
	}
	&:focus {
		border-bottom: 1px solid rgba(255,255,255,1);
	}
`

export const Label = styled.h4`
	color: white;
	margin-right: .5em;
	text-transform: uppercase;
	@media screen and (max-width: 1024px) {
		font-size: .8em;
	}
	@media screen and (max-width: 600px) {
		font-size: .5em;
	}
`
export const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: end;
	width: 100%;
	margin-top: .2em;

`
export const AddButton = styled.img`
	cursor: pointer;
	&:hover{
		color: ${theme.colors.active};
	}
	width: 15px;
	height: 15px;
`;

export const RemoveButton = styled.img`
	cursor: pointer;
	&:hover{
		color: ${theme.colors.active};
	}
	width: 18px;
	height: 18px;
	/* margin-left: .5em; */
`;

export const AddressWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	box-sizing: border-box;
	margin: 0;

`

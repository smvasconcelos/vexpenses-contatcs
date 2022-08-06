import styled from "styled-components";
import theme from "config/theme";

export const Input = styled.input`
	all: unset;
	border-bottom: 2px solid white;
	/* background-color: #cccccc10; */
	/* padding: 1em; */
	/* border-radius: 5px; */
	width: 100%;
	color: black;
	font-weight: 400;
	padding-bottom: .2em;
	color: rgba(255,255,255,.7);
	font-size: .8em;
	@media screen and (max-width: 1024px) {
		font-size: .6em;
	}
	@media screen and (max-width: 600px) {
		font-size: .4em;
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
	margin: .5em 0;

`

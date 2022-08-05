import styled from "styled-components";
import theme from "config/theme";

export const Input = styled.input`
	all: unset;
	border-bottom: 2px solid white;
	width: 100%;
	font-weight: 400;
	padding-bottom: .2em;
	color: rgba(255,255,255,.7);
`

export const Label = styled.h3`
	color: white;
	margin-right: .5em;
`
export const InputContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: end;
	width: 100%;
`

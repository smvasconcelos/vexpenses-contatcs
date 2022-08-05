import styled from "styled-components";

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
`
export const ListTable = styled.table`
	text-align: center;
	margin: 2em 0;
	width: 100%;
	height: fit-content;
	& > *{
		color: #fff;
	}
	border-collapse: collapse;
	border-collapse:separate;
  border-spacing: 0 1.5em;
`
export const ListThead = styled.thead`
`
export const ListTbody = styled.tbody`
`
export const ListTr = styled.tr`
`
export const ListTh = styled.th`
`
export const ListTd = styled.td`
`
export const Divider = styled.div`
    width: 80%;
    height: 3px;
    background-color: #fff;
    left: 15%;
		position: absolute;
`

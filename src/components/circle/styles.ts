import theme from "config/theme";
import styled from "styled-components";

interface Circle {
	size: number;
	position: string;
	type: number;
}

export const CircleComponent = styled.div<Circle>`
	width: ${props => props.size}px;
	height: ${props => props.size}px;
	filter: blur(0) !important;
	border-radius: 50%;
	background-image: ${props =>
		props.type === 1 ?
			`linear-gradient(180deg, ${theme.colors.gradient.circle.big.from}, ${theme.colors.gradient.circle.big.to})` :
			`linear-gradient(180deg, ${theme.colors.gradient.circle.medium.from}, ${theme.colors.gradient.circle.medium.to})`
	};
	position: absolute;
	${(props) => props.position};
	z-index: -2;
	@media screen and (max-width: 1024px) {
		${props => props.type === 1 ?
		`width : ${props.size / 1.7}px;
			height: ${props.size / 1.7}px;`
		:
		`width : ${props.size}px;
			height: ${props.size}px;`
		};

	}
`;

import styled from "styled-components";
import theme from "config/theme";

export const TemplateContainer = styled.div`
	height: 100%;
	width: 100%;
	/* background-image: linear-gradient(90deg, ${theme.colors.gradient.primary.from}, ${theme.colors.gradient.primary.to}); */
	/* opacity: .1; */
	filter: blur(6px);
	position: absolute;
	z-index: -1;
`;
export const Container = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	box-sizing: border-box;
	justify-content: space-around;
	align-items: center;
	padding: 0;
	margin: 0;
`;

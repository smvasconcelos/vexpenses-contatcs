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
	@media screen and (max-width: 1024px) {
		padding-top: 2em;
	}
`;

export const ContentContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-space-between;
	align-items: space-between;
	box-sizing: border-box;
	@media screen and (max-width: 1024px) {
		margin-top: 2em;
	}
`

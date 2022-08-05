import Circle from "components/circle";
import Footer from "components/footer";
import Sidebar from "components/sidebar";
import React from "react";
import { Container, TemplateContainer } from "./styles";

const UserTemplate: React.FC<{ children: any }> = ({ children }) => {
	return (
		<Container>
			<Sidebar />
			<TemplateContainer>
				{/* <Noise src={"assets/img/noise.png"} /> */}
				<Circle size={200} position="top: 35vh; left: 10vw; opacity: .3" type={1} />
				<Circle size={300} position="bottom: 0; right: 5%; opacity: .3;" type={2} />
			</TemplateContainer>
			{children}
			<Footer />
		</Container>
	)
}

export default UserTemplate;

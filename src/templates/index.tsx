import Circle from "components/circle";
import Footer from "components/footer";
import Navbar from "components/navbar";
import React from "react";
import { Container, TemplateContainer } from "./styles";

const Template: React.FC<{ children: any }> = ({ children }) => {
	return (
		<Container>
			<Navbar />
			<TemplateContainer>
				{/* <Noise src={"assets/img/noise.png"} /> */}
				<Circle size={200} position="top: 45vh; left: 15vw; opacity: .3" type={1} />
				<Circle size={400} position="top: -25vh; left: 35vw; opacity: .9;" type={1} />
				<Circle size={300} position="top: 45vh; right: 10%; opacity: .5;" type={2} />
			</TemplateContainer>
			{children}
			<Footer />
		</Container>
	)
}

export default Template;

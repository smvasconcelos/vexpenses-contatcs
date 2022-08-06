import React from "react";
import { useNavigate } from "react-router-dom";
import { Input, InputContainer, Label } from "./styles";

const InputComponent: React.FC<{ label: string }> = ({ label }) => {

	const navigate = useNavigate();

	return (
		<InputContainer>
			<Label>{label}</Label>
			<Input placeholder={label} />
		</InputContainer>
	)
}

export default InputComponent;

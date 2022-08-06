import React from "react";
import { Input, InputContainer, Label } from "./styles";

const InputComponent: React.FC<
	{
		label: string,
		register?: any,
		name: string
	}
	> = ({ label, register, name }) => {

	return (
		<InputContainer>
			<Label>{label}</Label>
			<Input
				{...register!(name)} placeholder={label}
			/>
		</InputContainer>
	)
}

export default InputComponent;

import React, { useState } from "react";
import { Input, InputContainer, Label } from "./styles";

const InputComponent: React.FC<
	{
		label: string,
		onChange?: (value: string) => void
	}
> = ({ label, onChange }) => {

	const [value, setValue] = useState("");

	const onChangeValue = (value: string) => {
		setValue(value);
		if (onChange) {
			onChange(value);
		}
	}

	return (
		<InputContainer>
			<Label>{label}</Label>
			<Input value={value} onChange={(e) => onChangeValue(e.target.value)} placeholder={label} />
		</InputContainer>
	)
}

export default InputComponent;

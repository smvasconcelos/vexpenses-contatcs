import addIcon from "assets/icons/add.svg";
import removeIcon from "assets/icons/remove.svg";
import React, { useEffect, useState } from "react";
import MailService from "services/mail";
import { AddButton, Input, InputContainer, Label, RemoveButton } from "./styles";

interface IInput {
	label: string;
	register?: any;
	name: string;
	append?: () => void;
	getValues?: any;
	add?: boolean;
	unregister?: any,
	remove?: (name: string) => void;
	mask?: (value: string) => string;
	initialValue?: string;
}

const InputComponent: React.FC<IInput> = ({ label, unregister, getValues, register, name, append, add, remove, mask, initialValue }) => {

	const [show, setShow] = useState(false);

	const checkAdd = (value: string) => {
		if ((value !== "" && add && value !== undefined) || (initialValue !== undefined && initialValue !== ""))
			setShow(true);
		else
			setShow(false);
	}

	return (
		<InputContainer>
			<Label>{label}</Label>
			<Input
				{...register!(name, {
					value: initialValue || ""
				})} placeholder={label}
				onChange={
					((event) => {
						const { value } = event.target;
						checkAdd(value);
						event.target.value = mask ? mask(value) : value;
					})
				}
			/>
			{
				show && <AddButton src={addIcon} onClick={() => append!()} />
			}
			{
				name.includes("phone") && !add && (
					<RemoveButton onClick={() => {
						unregister(name);
						remove!(name);
					}} src={removeIcon} />
				)
			}
		</InputContainer>
	)
}

export default InputComponent;

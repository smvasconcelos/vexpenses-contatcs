import addIcon from "assets/icons/add.svg";
import removeIcon from "assets/icons/remove.svg";
import React, { useEffect, useState } from "react";
import MailService from "services/mail";
import { AddressWrapper } from "../styles";
import { AddButton, Input, InputContainer, Label, RemoveButton } from "../styles";
import { toast } from "react-toastify";
import masks from "lib/masks";

interface IInput {
	label: string;
	register?: any;
	name: string;
	append?: () => void;
	getValues?: any;
	add?: boolean;
	unregister?: any,
	remove?: (name: any) => void;
	setValue?: any;
}

const InputComponent: React.FC<IInput> = ({ label, unregister, register, name, append, add, remove, setValue, getValues }) => {

	const [show, setShow] = useState(false);
	// bairro: "Nossa Senhora de Fátima"
	// cep: "45604-105"
	// complemento: "de 120/121 a 548/549"
	// ddd: "73"
	// gia: ""
	// ibge: "2914802"
	// localidade: "Itabuna"
	// logradouro: "Rua São Sebastião"
	// siafi: "3597"
	// uf: "BA"

	const getAddress = async (cep: string) => {
		await MailService.getAddress(parseInt(cep)).then(res => {
			console.log("aki");
			if (res.erro)
				toast.error("Endereço CEP inexistente");
			console.log(res);
			setValue(`neighborhood_${name}`, res.bairro);
			setValue(`street_${name}`, res.logradouro);
			setValue(`city_${name}`, res.localidade);
			setValue(`state_${name}`, res.uf);
			setValue(`complement_${name}`, res.complemento);
		}).catch(err => {
			toast.error("Endereço CEP inexistente");
		});
	}

	const checkAdd = (value: string) => {
		if (value !== "" && add && value !== undefined)
			setShow(true);
		else
			setShow(false);
	}

	return (
		<AddressWrapper>
			<InputContainer>
				<Label>CEP</Label>
				<Input
					maxLength={8}
					{...register!(`cep_${name}`)}
					onChange={
						((event) => {
							const { value } = event.target;
							checkAdd(value);
							event.target.value = masks.cepMask(value);
						})
					}
					onKeyUp={async (event) => {
						const { value } = event.target;
						if (event.code === "Enter" && value)
							if (value.length === 8)
								await getAddress(value)
					}}
					placeholder={label}
				/>

				<Label>Bairro</Label>
				<Input
					{...register!(`neighborhood_${name}`)} placeholder={"Nossa senhora de fátima"}
				/>
				{
					show && <AddButton src={addIcon} onClick={() => append!()} />
				}
				{
					!add && (
						<RemoveButton onClick={() => {
							unregister(`neighborhood_${name}`);
							unregister(`complement_${name}`);
							unregister(`street_${name}`);
							unregister(`state_${name}`);
							unregister(`city_${name}`);
							unregister(`cep_${name}`);
							remove!(name);
						}} src={removeIcon} />
					)
				}
			</InputContainer>
			<InputContainer>
				<Label>Complemento</Label>
				<Input
					{...register!(`complement_${name}`)} placeholder={"complemento"}
				/>

				<Label>Rua</Label>
				<Input
					{...register!(`street_${name}`)} placeholder={"rua"}
				/>
			</InputContainer>
			<InputContainer>
				<Label>Estado</Label>
				<Input
					{...register!(`state_${name}`)} placeholder={"BA"}
				/>

				<Label>Cidade</Label>
				<Input
					{...register!(`city_${name}`)} placeholder={"cidade"}
				/>
			</InputContainer>
		</AddressWrapper>
	)
}

export default InputComponent;

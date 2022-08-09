import addIcon from "assets/icons/add.svg";
import removeIcon from "assets/icons/remove.svg";
import React, { useEffect, useState } from "react";
import MailService from "services/mail";
import { AddressWrapper } from "../styles";
import { AddButton, Input, InputContainer, Label, RemoveButton } from "../styles";
import { toast } from "react-toastify";
import masks from "lib/masks";

interface AddressData {
	cep?: string;
	street?: string;
	city?: string;
	state?: string;
	complement?: string;
	neighborhood?: string;
}

type HTMLElementEvent<T extends HTMLElement> = Event & {
	target: T;
}

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
	initialValue?: AddressData;
}

const AddressInput
	: React.FC<IInput> = ({ label, unregister, register, name, append, add, remove, setValue, getValues, initialValue }) => {

		const [show, setShow] = useState(false);

		/**
		* Recebe o cep e busca o endereço na api
		* @param cep cep do local
		* @returns void
		*/
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
			if ((value !== "" && add && value !== undefined) || (initialValue?.cep !== undefined && initialValue?.cep !== ""))
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
						{...register!(`cep_${name}`, {
							value: initialValue?.cep || ""
						})}
						onChange={
							((event: any) => {
								const value = event.target.value;
								event.target.value = masks.cepMask(value);
								checkAdd(value);
							})
						}
						onKeyDown={async (event: any) => {
							const value = event.target.value;
							if (event.code === "Enter" && value) {
								event.stopPropagation();
								event.preventDefault();
								if (value.length === 8)
									await getAddress(value)
							}
						}}
						placeholder={"45405105"}
					/>

					<Label>Bairro</Label>
					<Input
						{...register!(`neighborhood_${name}`, {
							value: initialValue?.neighborhood || ""
						})} placeholder={"Nossa senhora de fátima"}
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
						{...register!(`complement_${name}`, {
							value: initialValue?.complement || ""
						})} placeholder={"complemento"}
					/>

					<Label>Rua</Label>
					<Input
						{...register!(`street_${name}`, {
							value: initialValue?.street || ""
						})} placeholder={"rua"}
					/>
				</InputContainer>
				<InputContainer>
					<Label>Estado</Label>
					<Input
						{...register!(`state_${name}`, {
							value: initialValue?.state || ""
						})} placeholder={"BA"}
					/>

					<Label>Cidade</Label>
					<Input
						{...register!(`city_${name}`, {
							value: initialValue?.city || ""
						})} placeholder={"cidade"}
					/>
				</InputContainer>
			</AddressWrapper>
		)
	}

export default AddressInput;

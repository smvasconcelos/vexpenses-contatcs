import React, { useState } from "react";
import { AutoCompleteContainer, AutoCompleteItem, Container, Input, InputContainer, Label } from "./styles";
import FuzzySearch from 'fuzzy-search';

const InputSearch: React.FC<
	{
		label: string,
		onChange?: (value: string) => void,
		autoCompleteItems?: Array<Object>
	}
> = ({ label, onChange, autoCompleteItems }) => {

	const [value, setValue] = useState("asdas");
	const [show, setShow] = useState(false);
	const [filteredAutoCompleteItems, setFilteredAutoCompleteItems] = useState<Array<Object>>([]);

	const searcher = new FuzzySearch(autoCompleteItems || [], ['name', 'email', 'contact', 'job', 'address'], {
		caseSensitive: false,
	});

	const onChangeValue = (value: string) => {
		setValue(value);
		if (value === "") {
			setShow(false);
		} else {
			setShow(true);
		}
		if (onChange) {
			onChange(value);
		}
		setFilteredAutoCompleteItems(searcher.search(value));
	}

	return (
		<Container>
			<InputContainer>
				<Label>{label}</Label>
				<Input value={value} onChange={(e) => onChangeValue(e.target.value)} placeholder={label} />
			</InputContainer>
			{
				show && filteredAutoCompleteItems.length !== 0 &&
				<AutoCompleteContainer>
					{
						filteredAutoCompleteItems.map((item: any) => {
							return (
								<AutoCompleteItem key={item.id} onClick={() => {
									onChangeValue(item.name);
									setShow(false);
								}}>
									{item.name}
								</AutoCompleteItem>
							)
						})
					}
				</AutoCompleteContainer>
			}
		</Container>
	)
}

export default InputSearch;

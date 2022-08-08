import React, { useEffect, useState } from "react";
import { AutoCompleteContainer, AutoCompleteItem, Container, Input, InputContainer, Label } from "./styles";
import FuzzySearch from 'fuzzy-search';
import helpers from "lib/helpers";

const InputSearch: React.FC<
	{
		label: string,
		onChange?: (value: string) => void,
		autoCompleteItems?: Array<Object>
	}
> = ({ label, onChange, autoCompleteItems }) => {

	const [value, setValue] = useState("");
	const [show, setShow] = useState(false);
	const [filteredAutoCompleteItems, setFilteredAutoCompleteItems] = useState<Array<Object>>([]);

	const searcher = new FuzzySearch(autoCompleteItems || [], ['name', 'email', 'phone', 'job', 'address'], {
		caseSensitive: false,
	});

	const handleCompare = (string_1: string, string_2: string) => {
		var threshold: number = 0.28;
		return helpers.similarity(string_1.toLowerCase(), string_2.toLowerCase()) >= threshold || string_1.toLowerCase().includes(string_2.toLowerCase());
	}

	const getAutoCompleteItems = (items: Array<Object>) => {
		var filteredItems: Array<String> = [];
		items.map((item: Object) => {
			return Object.values(item).map((field: string | Array<string> | number) => {
				if (typeof field === 'string') {
					if (handleCompare(field, value))
						filteredItems.push(field);
				}
				else if (Array.isArray(field))
					field.map((fieldItem: string | object) => {
						if (typeof fieldItem === 'string') {
							if (handleCompare(fieldItem, value))
								filteredItems.push(fieldItem);
						} else {
							Object.values(fieldItem).map((item: string) => {
								if (handleCompare(item, value))
									filteredItems.push(item);
							})
						}
					});
			});
		});

		console.log({ filteredAutoCompleteItems });
		setFilteredAutoCompleteItems(filteredItems);
	}

	const onChangeValue = (value: string) => {
		setValue(value);
		if (value === "") {
			setShow(false);
		} else {
			setShow(true);
		}
		if (onChange) {
			if (value === '')
				onChange("");
			getAutoCompleteItems(searcher.search(value));
		}
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
						filteredAutoCompleteItems.map((item: any, index: number) => {
							return (
								<AutoCompleteItem key={`autocomplete-${index}`} onClick={() => {
									onChange!(item);
									setValue(item);
									setShow(false);
								}}>
									{item}
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

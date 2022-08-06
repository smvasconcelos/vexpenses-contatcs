import React from 'react';
import { Button } from './styles';

const ButtonComponent: React.FC<{ onclick: any, label: string }> = ({ onclick, label }) => {

	return (
		<Button onClick={() => onclick()}>
			{label}
		</Button>
	)
}

export default ButtonComponent;

import React from 'react';
import { Button } from './styles';

const ButtonComponent: React.FC<{ submit?: boolean, onclick?: any, label: string }> = ({ onclick, label, submit }) => {

	return (
		<Button type={submit ? 'submit' : 'button'} onClick={submit ? () => { } : () => onclick()}>
			{label}
		</Button>
	)
}

export default ButtonComponent;

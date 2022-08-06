
const validator = (variable: Array<any> | object) => {

	if (Array.isArray(variable)) {
		return variable.every(
			value => value !== undefined
		);
	} else {
		return Object.values(variable).every(
			value => value !== undefined || value !== ""
		);
	}

}

export default validator;

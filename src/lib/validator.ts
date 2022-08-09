const validator = (variable: Array<string> | object | any, ignoreKeys?: Array<string>) => {

	if (Array.isArray(variable)) {
		return variable.every((item) => item !== undefined && item);
	} else {
		return Object.keys(variable).every((key) => {
			if (Array.isArray(ignoreKeys)) {
				if (ignoreKeys.includes(key))
					return variable[key] !== undefined && variable[key];
				else
					return true;
			}
			else
				return variable[key] !== undefined && variable[key];
		});
	}

}

export default validator;

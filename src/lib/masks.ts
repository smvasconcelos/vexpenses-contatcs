const masks = {
	removeSpecialCharacter: (value: string) => {
		return value.replace(/[^a-zA-Z0-9]/g, "");
	},
	dayMonthYearMask: (value: string) => {
		return value
			.replace(/\D/g, "")
			.replace(/(\d{2})(\d)/, "$1/$2")
			.replace(/(\d{2})(\d)/, "$1/$2")
			.replace(/(\/\d{4})\d+?$/, "$1");
	},
	phoneBrMask: (value: string) => {
		return value
			.replace(/\D/g, "")
			.replace(/(\d{2})(\d)/, "($1) $2")
			.replace(/(\d{5})(\d)/, "$1-$2")
			.replace(/(-\d{4})\d+?$/, "$1");
	},
	cellphoneBrMask: (value: string) => {
		if (value.length < 3) {
			return value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "($1) $2");
		} else {
			return value
				.replace(/\D/g, "")
				.replace(/(\d{2})(\d)(\d)/, "($1) $2 $3")
				.replace(/(\d{4})(\d)/, "$1-$2")
				.replace(/(-\d{4})\d+?$/, "$1");
		}
	},
};
export default masks;

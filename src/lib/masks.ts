const masks = {
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
	cepMask: (value: string) => {
		return value
			.replace(/[^0-9\\.]+/g, "");
	},
	emailMask: (value: string) => {
		return value
			.replace(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, "")
	},
};
export default masks;

import api from "./api";

type methods = "post" | "get" | "put" | "patch" | "delete";
export const handleApi = async (
	path: string,
	method: methods,
	data: { data?: any; params?: any; },
) => {

	const response = await api[method](
		path,
		{
			...data.data,
			params: data.params,
		},
	);
	return response.data;
};
export default api;

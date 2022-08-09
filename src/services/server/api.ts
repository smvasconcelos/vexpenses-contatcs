import axios from 'axios';

// Pode ser algum servidor executando localmente:


const api = axios.create({
	baseURL: process.env.REACT_APP_MAIL_API,
});

// http://localhost:3000
api.interceptors.request.use((config: any) => {
	config.headers.post['Access-Control-Allow-Origin'] = '*';
	config.headers.get['Access-Control-Allow-Origin'] = '*';
	return config;
});

export default api;

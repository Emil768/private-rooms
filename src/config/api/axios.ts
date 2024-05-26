import axios from 'axios';

export const $api = axios.create({
	baseURL: import.meta.env.VITE_API,
	headers: {
		Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')!)?.accessToken}`,
	},
});

$api.interceptors.request.use((config) => {
	if (config.headers) {
		config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')!)?.accessToken}` || '';
	}
	return config;
});

export default $api;

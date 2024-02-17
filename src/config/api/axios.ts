import axios from 'axios';

const $api = axios.create({
	baseURL: import.meta.env.VITE_API,
	headers: {
		Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`,
	},
});

export default $api;

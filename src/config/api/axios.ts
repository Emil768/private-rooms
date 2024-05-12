import axios from 'axios';

const $api = axios.create({
	baseURL: import.meta.env.VITE_API,
	headers: {
		Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken}`,
	},
});

export default $api;
// axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

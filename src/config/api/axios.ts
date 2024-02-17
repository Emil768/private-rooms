import axios from 'axios';

const $api = axios.create({
	baseURL: 'https://a24205-62e6.x.d-f.pw/api',
	headers: {
		Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.accessToken || ''}`,
	},
});

export default $api;

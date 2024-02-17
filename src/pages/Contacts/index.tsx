import React, { FormEvent, useEffect, useState } from 'react';
import axios from '../../config/api/axios';

export const Contacts = () => {
	const [contacts, setContacts] = useState([]);

	useEffect(() => {
		const fetchContacts = async () => {
			try {
				const response = await axios.get('/Contacts/All');
				console.log('Успешный вход:', response.data);
			} catch (error) {
				console.error('Ошибка входа:', error);
			}
		};

		fetchContacts();
	}, []);

	return <div>Контакты</div>;
};

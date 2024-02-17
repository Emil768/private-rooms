import { useState } from 'react';

import './App.css';
import { Login } from './pages/Login';
import RegistrationPage from './pages/Register';
import { Contacts } from './pages/Contacts';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div>
			<Login />
			<RegistrationPage />
			<Contacts />
		</div>
	);
}

export default App;

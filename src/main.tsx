import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';
import StoreProvier from './providers/StoreProvider/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<StoreProvier>
			<App />
		</StoreProvier>
	</BrowserRouter>,
);

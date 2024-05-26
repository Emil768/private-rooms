import { FC, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createReduxStore } from '../../store';

interface ReduxProvierProps {
	children: ReactNode;
}

const StoreProvier: FC<ReduxProvierProps> = ({ children }) => {
	const navigate = useNavigate();

	const store = createReduxStore({ navigate });

	return <Provider store={store}>{children}</Provider>;
};

export default StoreProvier;

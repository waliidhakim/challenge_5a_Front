import { useAuth } from '../../components/context/authContext';

const MyComponent = () => {
    const { user, token, login, logout } = useAuth();
    return (
        <div>
            {user && <p>Bonjour, {user.name}</p>}
        </div>
    );
};

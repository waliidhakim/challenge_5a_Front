import { useAuth } from '../../components/context/authContext';

const MyComponent = () => {
    const { user, token, login, logout } = useAuth();
    // Vous pouvez maintenant utiliser user, token, login, et logout dans ce composant

    // Exemple : afficher le nom de l'utilisateur
    return (
        <div>
            {user && <p>Bonjour, {user.name}</p>}
        </div>
    );
};

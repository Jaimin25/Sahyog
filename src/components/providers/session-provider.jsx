import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../../lib/supabase';

const SessionContext = createContext();

export const useSession = () => {
    return useContext(SessionContext);
};

export function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) return null;
            const user = JSON.parse(
                localStorage.getItem('user')
            );
            setUser(user);
            setSession(data.session);
            setAccessToken(data.session.access_token);
        };
        getSession();

        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                const user = JSON.parse(
                    localStorage.getItem('user')
                );
                setUser(user);
                setSession(session);
                setAccessToken(session.access_token);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setSession(null);
                setAccessToken(null);
                localStorage.removeItem('user');
                setTimeout(() => {
                    navigate('/');
                }, 500);
            }
        });
    }, []);

    const saveUserDetails = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    return (
        <SessionContext.Provider
            value={{
                user,
                session,
                accessToken,
                saveUserDetails,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
}

import axios from 'axios';
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../../lib/supabase';
import { baseapiurl } from '../../lib/utils';

const SessionContext = createContext();

export const useSession = () => {
    return useContext(SessionContext);
};

export function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    const fetchUserDetails = async (user) => {
        try {
            const res = await axios.post(
                `${baseapiurl}/api/auth/sign-in`,
                { uid: user.id, email: user.email }
            );

            const resData = res.data;

            if (resData.statusCode === 200) {
                user.fullname = resData.userDetails.fullname;
                user.emailVerified =
                    resData.userDetails.emailVerified;
                user.profilePicUrl =
                    resData.userDetails.profilePicUrl;

                localStorage.setItem(
                    'user',
                    JSON.stringify(user)
                );
                setUser(user);
            }
        } catch (error) {}
    };

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
            fetchUserDetails(user);
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

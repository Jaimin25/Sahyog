import { createContext, useContext, useEffect, useState } from 'react';

import { supabase } from '../../lib/supabase';

const SessionContext = createContext();

export const useSession = () => {
    return useContext(SessionContext);
};

export function SessionProvider({ children }) {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) return null;
            const user = JSON.parse(localStorage.getItem('user'));
            setUser(user);
            setSession(data.session);
        };
        getSession();

        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                const user = JSON.parse(localStorage.getItem('user'));
                setUser(user);
                setSession(session);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setSession(null);
                localStorage.removeItem('user');
            }
        });
    }, []);

    const saveUserDetails = (user) => {
        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
    };

    return <SessionContext.Provider value={{ user, session, saveUserDetails }}>{children}</SessionContext.Provider>;
}

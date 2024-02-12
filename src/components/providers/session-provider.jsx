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
            setUser(data.session.user);
            setSession(data.session);
        };
        getSession();

        supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_IN') {
                setUser(session.user);
            } else if (event === 'SIGNED_OUT') {
                setUser(null);
                setSession(null);
            }
        });
    }, []);

    return <SessionContext.Provider value={{ user, session }}>{children}</SessionContext.Provider>;
}

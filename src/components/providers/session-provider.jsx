import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { supabase } from '../../lib/supabase';
import { baseapiurl } from '../../lib/utils';

const SessionContext = createContext();

export const useSession = () => {
  return useContext(SessionContext);
};

export function SessionProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  const toast = useToast();

  const navigate = useNavigate();

  const fetchUserDetails = async (user) => {
    try {
      const res = await axios.post(`${baseapiurl}/api/auth/sign-in`, { uid: user.id, email: user.email });

      const resData = res.data;

      if (resData.statusCode === 200) {
        user.fullname = resData.userDetails.fullname;
        user.emailVerified = resData.userDetails.emailVerified;
        user.profilePicUrl = resData.userDetails.profilePicUrl;

        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        position: 'top-right',
        duration: 1000,
      });
    }
  };

  const updateUserEmail = async (user, accessToken, uid, email) => {
    try {
      const res = await axios.post(`${baseapiurl}/api/user/changeUserEmail`, {
        uid,
        email,
        access_token: accessToken,
      });
      const resData = res.data;
      if (resData.statusCode === 200) {
        user.email = resData.userDetails.email;
        user.emailVerified = resData.userDetails.emailVerified;

        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        toast({
          title: 'Email updated',
          description: 'Your email has been updated',
          status: 'success',
          position: 'top-right',
          duration: 1000,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        position: 'top-right',
        duration: 1000,
      });
    }
  };

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        setLoading(false);
        return null;
      }
      const user = JSON.parse(localStorage.getItem('user'));

      setSession(data.session);
      setAccessToken(data.session.access_token);

      const changedEmail = data.session.user.email;

      if (changedEmail !== user.email) {
        updateUserEmail(user, data.session.access_token, data.session.user.id, changedEmail);
        setLoading(false);
      } else {
        fetchUserDetails(data.session.user);
        setLoading(false);
      }
    };
    getSession();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        const user = JSON.parse(localStorage.getItem('user'));
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
        }, 250);
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
        loading,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

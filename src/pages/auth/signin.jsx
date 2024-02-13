import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SignInComponent from '../../components/auth/sign-in';
import { useSession } from '../../components/providers/session-provider';

const SignInPage = () => {
    const navigate = useNavigate();
    const { session, user } = useSession();

    useEffect(() => {
        if (session && user) navigate('/dashboard');
    }, [session, user]);

    return (
        <div className="signup.container flex h-full w-full flex-1 items-center justify-center">
            <SignInComponent />
        </div>
    );
};

export default SignInPage;

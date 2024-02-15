import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import SignUpComponent from '../../components/auth/sign-up';
import { useSession } from '../../components/providers/session-provider';

const SignUpPage = () => {
    const navigate = useNavigate();
    const { session, user } = useSession();

    useEffect(() => {
        if (session && user) navigate('/dashboard');
    }, [session, user]);

    if (!session || !user)
        return (
            <div className="signup.container flex h-full w-full flex-1 items-center justify-center bg-teal-500">
                <SignUpComponent />
            </div>
        );
};

export default SignUpPage;

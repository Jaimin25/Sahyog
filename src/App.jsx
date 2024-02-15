import { Route, Routes } from 'react-router-dom';

import Footer from './components/footer/footer';
import Navbar from './components/header/navbar';
import { useSession } from './components/providers/session-provider';
import SignInPage from './pages/auth/signin';
import SignUpPage from './pages/auth/signup';
import UserDashboard from './pages/dashboard/userDashboard';
import CreateFundraiserPage from './pages/fundraiser/create/CreateFundraiserPage';
import FundraiserPage from './pages/fundraiser/fundraiserId/Campaign';
import FundraisersPage from './pages/fundraiser/FundraisersPage';
import Home from './pages/Home';
import ProtectedRoutes from './pages/ProtectedRoutes';

export const App = () => {
    const { session } = useSession();

    return (
        <main className="main flex h-full flex-col">
            <Navbar />
            <div className="mt-[76px] flex flex-1 flex-col">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/auth/signin"
                        element={<SignInPage />}
                    />
                    <Route
                        path="/auth/signup"
                        element={<SignUpPage />}
                    />
                    <Route
                        path="/fundraisers/discover"
                        element={<FundraisersPage />}
                    />
                    <Route
                        path="/fundraiser/:id"
                        element={<FundraiserPage />}
                    />
                    {/* PROTECTED ROUTES */}
                    <Route
                        element={
                            <ProtectedRoutes session={session} />
                        }
                    >
                        <Route
                            path="/dashboard"
                            element={<UserDashboard />}
                        />
                        <Route
                            path="/fundraiser/create"
                            element={<CreateFundraiserPage />}
                        />
                    </Route>
                </Routes>
            </div>
            <Footer />
        </main>
    );
};

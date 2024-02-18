import { Navigate, Route, Routes } from 'react-router-dom';

import Footer from './components/footer/footer';
import Navbar from './components/header/navbar';
import { useSession } from './components/providers/session-provider';
import SignInPage from './pages/auth/signin';
import SignUpPage from './pages/auth/signup';
import UserDashboard from './pages/dashboard/userDashboard';
import CreateFundraiserPage from './pages/fundraiser/create/CreateFundraiserPage';
import DiscoverFundraisersPage from './pages/fundraiser/fundraiserId/FundraiserPage';
import FundraisersPage from './pages/fundraiser/FundraisersPage';
import Home from './pages/Home';

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
                        element={
                            !session ? (
                                <SignInPage />
                            ) : (
                                <Navigate to="/" />
                            )
                        }
                    />
                    <Route
                        path="/auth/signup"
                        element={
                            !session ? (
                                <SignUpPage />
                            ) : (
                                <Navigate to="/dashboard" />
                            )
                        }
                    />
                    <Route
                        path="/fundraisers/discover"
                        element={<FundraisersPage />}
                    />
                    <Route
                        path="/fundraiser/:id"
                        element={<DiscoverFundraisersPage />}
                    />

                    {/* PROTECTED ROUTES */}
                    <Route
                        path="/dashboard"
                        element={
                            session &&
                            (session ? (
                                <UserDashboard />
                            ) : (
                                <SignInPage />
                            ))
                        }
                    />
                    <Route
                        path="/fundraiser/create"
                        element={
                            session &&
                            (session ? (
                                <CreateFundraiserPage />
                            ) : (
                                <SignInPage />
                            ))
                        }
                    />
                </Routes>
            </div>
            <Footer />
        </main>
    );
};

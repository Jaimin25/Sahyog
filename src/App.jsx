import { Navigate, Route, Routes } from 'react-router-dom';

import Footer from './components/footer/footer';
import Navbar from './components/header/navbar';
import { useSession } from './components/providers/session-provider';
import SignInPage from './pages/auth/signin';
import SignUpPage from './pages/auth/signup';
import UserDashboard from './pages/dashboard/user-dashboard-page';
import CreateFundraiserPage from './pages/fundraiser/create/create-fundraiser-page';
import DonateTo from './pages/fundraiser/donate/donate-to';
import DiscoverFundraisersPage from './pages/fundraiser/fundraiser-page';
import FundraiserPage from './pages/fundraiser/fundraiserId/fundraiser-details-page';
import ManageFundriaserPage from './pages/fundraiser/manage/manage-fundraiser';
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
                        element={<DiscoverFundraisersPage />}
                    />
                    <Route
                        path="/fundraiser/:id"
                        element={<FundraiserPage />}
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
                    <Route
                        path="/fundraiser/:id/manage"
                        element={
                            session &&
                            (session ? (
                                <ManageFundriaserPage />
                            ) : (
                                <SignInPage />
                            ))
                        }
                    />
                    <Route
                        path="/fundraiser/:id/donate"
                        element={
                            session &&
                            (session ? (
                                <DonateTo />
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

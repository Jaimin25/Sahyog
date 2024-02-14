import { Route, Routes } from 'react-router-dom';

import Footer from './components/footer/footer';
import Navbar from './components/header/navbar';
import { useSession } from './components/providers/session-provider';
import SignInPage from './pages/auth/signin';
import SignUpPage from './pages/auth/signup';
import CampaignsPage from './pages/campaigns/Campaigns';
import FundraiserPage from './pages/campaigns/fundraiserId/Campaign';
import UserDashboard from './pages/dashboard/userDashboard';
import Home from './pages/Home';
import Protected from './Protected';

export const App = () => {
    const { session } = useSession();

    return (
        <main className="main flex h-full flex-col">
            <Navbar />
            <div className="mt-[76px] flex flex-1 flex-col">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/dashboard"
                        element={
                            <Protected isLoggedIn={!!session}>
                                <UserDashboard />
                            </Protected>
                        }
                    />
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
                        element={<CampaignsPage />}
                    />
                    <Route
                        path="/fundraiser/:id"
                        element={<FundraiserPage />}
                    />
                </Routes>
            </div>
            <Footer />
        </main>
    );
};

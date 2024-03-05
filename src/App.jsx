import { Navigate, Route, Routes } from 'react-router-dom';

import Footer from './components/footer/footer';
import Navbar from './components/header/navbar';
import LoadingScreen from './components/loading-screen';
import { useSession } from './components/providers/session-provider';
import SignInPage from './pages/auth/signin';
import SignUpPage from './pages/auth/signup';
import UserDashboard from './pages/dashboard/user-dashboard-page';
import CreateFundraiserPage from './pages/fundraiser/create/create-fundraiser-page';
import DonatePage from './pages/fundraiser/donate/donate';
import DiscoverFundraisersPage from './pages/fundraiser/fundraiser-page';
import FundraiserPage from './pages/fundraiser/fundraiserId/fundraiser-details-page';
import ManageFundriaserPage from './pages/fundraiser/manage/manage-fundraiser';
import Home from './pages/Home';
import HowItWorksPage from './pages/how-it-works/how-it-works';

export const App = () => {
  const { session, loading, user } = useSession();

  return (
    <main className="main flex h-full flex-col">
      <Navbar />
      <div className="mt-[76px] flex flex-1 flex-col">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signin" element={!session ? <SignInPage /> : <Navigate to="/" />} />
          <Route path="/auth/signup" element={!session ? <SignUpPage /> : <Navigate to="/" />} />
          <Route path="/fundraisers/discover" element={<DiscoverFundraisersPage />} />
          <Route path="/fundraiser/:id" element={<FundraiserPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="*" element={<div>The page is not available</div>} />

          {/* PROTECTED ROUTES */}
          <Route
            path="/dashboard"
            element={loading ? <LoadingScreen /> : session && user ? <UserDashboard /> : <SignInPage />}
          />
          <Route
            path="/fundraiser/create"
            element={loading ? <LoadingScreen /> : session && user ? <CreateFundraiserPage /> : <SignInPage />}
          />
          <Route
            path="/fundraiser/:id/manage"
            element={loading ? <LoadingScreen /> : session && user ? <ManageFundriaserPage /> : <SignInPage />}
          />
          <Route
            path="/fundraiser/:id/donate"
            element={loading ? <LoadingScreen /> : session && user ? <DonatePage /> : <SignInPage />}
          />
        </Routes>
      </div>
      <Footer />
    </main>
  );
};

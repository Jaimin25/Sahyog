import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = ({ session }) => {
    return session ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default ProtectedRoutes;

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Routes/ProtectedRoute';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Profile from './components/Profile/Profile';
import { useAuth } from './context/AuthContext';

const AuthenticatedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated) {
        return <Navigate to="/profile" replace />;
    }

    return children;
};

const App = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            <AuthenticatedRoute>
                                <Login />
                            </AuthenticatedRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <AuthenticatedRoute>
                                <Register />
                            </AuthenticatedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <Profile />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/"
                        element={<Navigate to="/profile" replace />}
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default App;

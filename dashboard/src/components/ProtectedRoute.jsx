// components/ProtectedRoute.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login-signup');
    }
  }, [navigate]);

  return isAuthenticated() ? children : null;
}



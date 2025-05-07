// src/hooks/useAuth.js
import { useSelector } from 'react-redux';

export default function useAuth() {
  return useSelector((state) => ({
    isAuthenticated: state.auth?.isAuthenticated ?? false,
    user: state.auth?.user ?? null
  }));
}

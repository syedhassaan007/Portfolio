import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('admin_token'));
  const [username, setUsername] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    api.me()
      .then((data) => setUsername(data.username))
      .catch(() => {
        localStorage.removeItem('admin_token');
        setToken(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  async function login(user, pass) {
    const data = await api.login(user, pass);
    localStorage.setItem('admin_token', data.token);
    setToken(data.token);
    setUsername(data.username);
  }

  function logout() {
    localStorage.removeItem('admin_token');
    setToken(null);
    setUsername(null);
  }

  return (
    <AuthContext.Provider value={{ token, username, isAuthenticated: !!token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

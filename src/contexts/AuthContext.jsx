import React, { createContext, useState, useContext, useEffect } from 'react';
import netlifyIdentity from 'netlify-identity-widget';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Initialize Netlify Identity
    netlifyIdentity.init();

    // Get the current user if already logged in
    const user = netlifyIdentity.currentUser();
    if (user) {
      setCurrentUser({
        id: user.id,
        username: user.user_metadata?.full_name || user.email,
        email: user.email,
        role: user.app_metadata?.roles?.[0] || 'Member', // Assuming role is stored in app_metadata
      });
    }

    // Bind to login/logout events
    const handleLogin = (user) => {
      setCurrentUser({
        id: user.id,
        username: user.user_metadata?.full_name || user.email,
        email: user.email,
        role: user.app_metadata?.roles?.[0] || 'Member',
      });
      netlifyIdentity.close(); // Close the modal on login
    };

    const handleLogout = () => {
      setCurrentUser(null);
      netlifyIdentity.close(); // Close the modal on logout
    };

    netlifyIdentity.on('login', handleLogin);
    netlifyIdentity.on('logout', handleLogout);

    // Cleanup listeners on unmount
    return () => {
      netlifyIdentity.off('login', handleLogin);
      netlifyIdentity.off('logout', handleLogout);
    };
  }, []);

  const login = () => {
    netlifyIdentity.open('login');
  };

  const logout = () => {
    netlifyIdentity.logout();
  };

  const signup = () => {
    netlifyIdentity.open('signup');
  };

  const value = {
    currentUser,
    login,
    logout,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

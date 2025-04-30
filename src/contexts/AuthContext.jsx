import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Placeholder user data. Replace with actual authentication logic.
// Change role to 'Admin' to test admin privileges.
const placeholderUser = {
  id: 'user123', // Unique ID for the user
  username: 'Current User',
  role: 'Admin', // Possible roles: 'Member', 'Admin'
};

export const AuthProvider = ({ children }) => {
  // In a real app, user state would be managed by authentication logic (e.g., login/logout)
  const [currentUser, setCurrentUser] = useState(placeholderUser); 

  // TODO: Add functions for login, logout, signup that update currentUser

  const value = {
    currentUser,
    // Add auth functions here: login, logout, signup, etc.
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

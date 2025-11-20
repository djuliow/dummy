import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = (userData) => {
    const dummySession = {
      user: {
        id: userData.id,
        email: userData.email,
      },
      access_token: 'dummy-token',
    };
    setSession(dummySession);
    setUserProfile({ subscription_status: userData.subscription_status || 'free' });
  };

  const logout = () => {
    setSession(null);
    setUserProfile(null);
  };

  const updateSubscription = async (newStatus) => {
    if (!session || !session.user) {
      console.error("Cannot update subscription, no user is logged in.");
      return;
    }
    
    try {
      const response = await axios.patch(`http://localhost:3000/users/${session.user.id}`, {
        subscription_status: newStatus,
      });
      setUserProfile({ subscription_status: response.data.subscription_status });
    } catch (error) {
      console.error("Failed to update subscription:", error);
    }
  };

  const value = {
    session,
    user: session?.user,
    userProfile,
    loading,
    login,
    logout,
    updateSubscription,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
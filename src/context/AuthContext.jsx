import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('velvet_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('velvet_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('velvet_user');
    }
  }, [user]);

  const loginWithPhone = (phone, name = 'Salem Ice Cream Lover') => {
    const newUser = {
      id: `CUST-${Math.floor(100000 + Math.random() * 900000)}`,
      phone: phone.startsWith('+91') ? phone : `+91 ${phone}`,
      name: name,
      joinedAt: new Date().toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
      defaultAddress: 'Alagapuram, Salem - 636004'
    };
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoginOpen,
        setIsLoginOpen,
        user,
        loginWithPhone,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}

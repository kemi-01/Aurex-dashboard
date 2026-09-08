import { createContext, useContext, useEffect, useState } from "react";

import {
  getStorage,
  setStorage,
  removeStorage,
} from "../utils/storage";

const AuthContext = createContext(null);

const DEMO_USER = {
  id: "USR-001",
  name: "Amara Johnson",
  email: "admin@aurex.com",
  role: "Administrator",
  avatar: "AJ",
};

const DEMO_PASSWORD = "aurex123";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    getStorage("aurexUser", null)
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = getStorage("aurexUser", null);

    if (savedUser) {
      setUser(savedUser);
    }

    setLoading(false);
  }, []);

  const login = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    if (cleanEmail !== DEMO_USER.email) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    if (password !== DEMO_PASSWORD) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    setStorage("aurexUser", DEMO_USER);

    setUser(DEMO_USER);

    return {
      success: true,
      user: DEMO_USER,
    };
  };

  const logout = () => {
    removeStorage("aurexUser");
    setUser(null);
  };

  const updateUser = (updates) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updates,
    };

    setUser(updatedUser);

    setStorage("aurexUser", updatedUser);
  };

  const value = {
    user,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
};

export default AuthContext;
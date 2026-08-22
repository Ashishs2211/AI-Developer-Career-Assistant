import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  const [loading, setLoading] = useState(true);

  /* ================= INITIAL AUTH CHECK ================= */

  useEffect(() => {
    const storedToken =
      localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  /* ================= LOGIN ================= */

  const login = (jwtToken) => {
    localStorage.setItem(
      "token",
      jwtToken
    );

    setToken(jwtToken);
  };

  /* ================= LOGOUT ================= */

  const logout = () => {
    localStorage.removeItem("token");

    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        login,
        logout,
        loading,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* ================= USE AUTH ================= */

export function useAuth() {
  return useContext(AuthContext);
}
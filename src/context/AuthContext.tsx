import { createContext, useContext, useState } from "react";

const AuthContext = createContext<AuthContext | undefined>(undefined);
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within a AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState<AuthContextState>({
    token: localStorage.getItem("token"),
  });

  const logout = () => {
    localStorage.removeItem("token");
    setState({ token: null });
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setState({ token });
    window.location.href = "/welcome";
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

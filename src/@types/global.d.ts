interface AuthContextState {
  token: string | null;
}
interface AuthContext extends AuthContextState {
  logout: () => void;
  login: (token: string) => void;
}

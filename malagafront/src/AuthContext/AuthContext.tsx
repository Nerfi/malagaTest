import {
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  token: string | null;
  setToken: (newToken: SetStateAction<string | null>) => void;
}

interface Props {
  children: JSX.Element;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  setToken: () => {},
});

const AuthProvider = ({ children }: Props) => {
  //token state
  const [token, setToken_] = useState<string | null>(
    localStorage.getItem("token")
  );

  const setToken = (newToken: SetStateAction<string | null>) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const values: AuthContextProps = {
    token,
    setToken,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;

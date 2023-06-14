import {
  Routes,
  Route,
  NavLink,
  Navigate,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../AuthContext/AuthContext";

interface ProtectedProps {
  children: JSX.Element;
}
const ProtectedRoute = ({ children }: ProtectedProps) => {
  //importar my hook de context aqui
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;

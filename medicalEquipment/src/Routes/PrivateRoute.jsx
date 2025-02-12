import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";


const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <div className="text-center">
        <span className="loading loading-spinner bg-red-500 loading-lg "></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate state={{from:location}} replace to="/login"/>
};

export default PrivateRoute;
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUserStore from "../stores/useUserStore";

const ProtectedRouter = () => {
  const { userData } = useUserStore();
  const { pathname } = useLocation;

  return userData? (<Outlet/>) : (<Navigate to="/log-in" replace state={{redirectedFrom: pathname}} />);
};

export default ProtectedRouter;

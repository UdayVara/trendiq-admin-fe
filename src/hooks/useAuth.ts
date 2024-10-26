import { AuthContext } from "@/context/auth.context";
import { useContext } from "react";

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (auth && auth.user && auth.setUser) {
    return { user: auth.user, setUser: auth.setUser };
  }
};

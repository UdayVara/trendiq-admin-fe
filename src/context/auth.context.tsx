"use client";
import { getUser } from "@/actions/auth.actions";
import { userType } from "@/types/user.types";
import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext<{
  user: userType | null;
  setUser: React.Dispatch<React.SetStateAction<userType | null>>;
} | null>(null);

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userType | null>(null);

  const fetchUser = async () => {
    try {
      const res = await getUser();
      if (res?.user) {
        setUser(res?.user || null);
      }
    } catch (e: any) {
      console.log(e, "Error");
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

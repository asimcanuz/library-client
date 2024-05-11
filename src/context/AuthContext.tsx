import React, { createContext, Dispatch, SetStateAction, useState } from "react";


type AuthState = {
  username?: string;
  accessToken?: string;
  role?: string[];
}


type AuthContextActions = {
  setAuth: Dispatch<SetStateAction<AuthState>>;
  setPersist: Dispatch<SetStateAction<boolean>>;
}


type AuthContextType = {
  auth: AuthState;
  persist: boolean;
  setAuth: (auth: AuthState) => void;
  setPersist: (persist: boolean) => void;
}


export const AuthContext = createContext<AuthContextType>({
  auth: { username: "", accessToken: "", role: [] },
  persist: false,
  setAuth: () => {},
  setPersist: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>(() => {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      return JSON.parse(storedAuth);
    } else {
      return { username: "", accessToken: "",  roles: [] };
    }
  });
  
  const [persist, setPersist] = useState<boolean>(() => {
    const storedPersist = localStorage.getItem("persist");
    return storedPersist ? JSON.parse(storedPersist) : false;
  });



  const value:AuthContextType = {auth, persist, setAuth, setPersist}; 

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ auth, persist, setAuth, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

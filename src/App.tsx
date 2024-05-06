import { useEffect, useState } from "react";
import "./App.css";
import { Login } from "./Login";
import { getAuthToken } from "./BackendService";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayloads } from "./CustomJwtPayloads";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = getAuthToken();
    if (token !== null) {
      setIsAuthenticated(true);
      const decoded = jwtDecode<CustomJwtPayloads>(token);
      console.log(decoded);
      setIsAdmin(false);

      // if (decoded.role === "ADMIN") {
      //   setIsAdmin(true);
      // } else {
      // }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  console.log(isAuthenticated);

  return (
    <>
      {isAuthenticated ? (
        <>
          <h1>Welcome to the app!</h1>
          {isAdmin ? <h2>Admin</h2> : <h2>User</h2>}
          <button onClick={() => setIsAuthenticated(false)}>Logout</button>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </>
  );
}

export default App;

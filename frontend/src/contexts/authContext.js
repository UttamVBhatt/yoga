import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthUser = () => useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        allUsers,
        setAllUsers,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

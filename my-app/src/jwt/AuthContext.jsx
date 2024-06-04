import { createContext, useState } from 'react';

const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState('');

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <AuthContext.Provider value={{ token, updateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

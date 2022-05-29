import { createContext, useContext, useState } from 'react';
import React from 'react';

const UserContext = createContext();

export default function UserProvider({ children }) {
  const [users, setUsers] = useState([]);
  return (
    <UserContext.Provider value={{ setUsers, users }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserState() {
  return useContext(UserContext);
}

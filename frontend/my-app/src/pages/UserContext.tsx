// contexts/UserContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  uid: string | null;
  setUid: (uid: string | null) => void;
}

const UserContext = createContext<UserContextType>({
  uid: null,
  setUid: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [uid, setUid] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ uid, setUid }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

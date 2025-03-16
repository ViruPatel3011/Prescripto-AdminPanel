import { createContext, ReactNode, useContext, useState } from "react";

interface AdminContextType {
  aToken: string | null;
  setAToken: (token: string) => void;
  backendUrl: string;
}

interface AdminContextProviderProps {
  children: ReactNode;
}

const AdminContext = createContext<AdminContextType | null>(null);

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({
  children,
}) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );

  const backendUrl = import.meta.env.VITE_BACKEND_URl;

  const value = {
    aToken,
    setAToken,
    backendUrl,
  };

  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

const useAdminContext = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error(
      "useAdminContext must be used within an AdminContextProvider"
    );
  }
  return context;
};

export { AdminContext, AdminContextProvider, useAdminContext };

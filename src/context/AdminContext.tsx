import axios from "axios";
import { createContext, ReactNode, useContext, useState } from "react";
import { toast } from "react-toastify";

interface AdminContextType {
  aToken: string | null;
  setAToken: (token: string) => void;
  backendUrl: string;
  doctors: any[];
  getAllDoctors: () => {};
  changeAvailability: (docId: string) => {};
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
  const [doctors, setDoctors] = useState([]);

  const backendUrl = import.meta.env.VITE_BACKEND_URl;

  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        {
          headers: {
            aToken,
          },
        }
      );

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error("Error occured in fetching doctors");
      }
    } catch (error: any) {
      toast.error(error.message || "Error occured in fetching doctors");
    }
  };

  const changeAvailability = async (docId: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        {
          headers: {
            aToken,
          },
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const value = {
    aToken,
    setAToken,
    backendUrl,
    doctors,
    getAllDoctors,
    changeAvailability,
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

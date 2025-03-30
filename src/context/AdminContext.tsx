import axios from "axios";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { toast } from "react-toastify";
import {
  Appointment,
  Doctor,
  AdminContextType,
  DashData,
} from "../assets/assets";

const defaultValue: AdminContextType = {
  aToken: null,
  setAToken: () => {},
  backendUrl: "",
  doctors: [],
  getAllDoctors: () => {},
  changeAvailability: () => {},
  getAllAppointments: () => {},
  appointments: [],
  setAppointments: () => {},
  cancelAppointment: () => {},
  getDashData: () => {},
  dashData: {
    doctors: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  },
};

interface AdminContextProviderProps {
  children: ReactNode;
}

const AdminContext = createContext<AdminContextType>(defaultValue);

const AdminContextProvider: React.FC<AdminContextProviderProps> = ({
  children,
}) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const [dashData, setDashData] = useState<DashData>({
    appointments: 0,
    doctors: 0,
    patients: 0,
    latestAppointments: [],
  });

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

  const getAllAppointments = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/appointments", {
        headers: {
          aToken,
        },
      });
      if (data.success) {
        setAppointments(data.appointments);
        console.log("data.appointments", data.appointments);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/cancel-appointment",
        {
          appointmentId,
        },
        {
          headers: {
            aToken,
          },
        }
      );
      if (data.success) {
        toast.success(data.message);
        getAllAppointments();
        getDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDashData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/admin/dashboard", {
        headers: {
          aToken,
        },
      });
      if (data.success) {
        setDashData(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
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
    getAllAppointments,
    appointments,
    setAppointments,
    cancelAppointment,
    getDashData,
    dashData,
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

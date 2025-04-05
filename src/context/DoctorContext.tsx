import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  Appointment,
  Doctor,
  DoctorContextType,
  DoctorDashData,
} from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";

const defaultValue: DoctorContextType = {
  dToken: null,
  setDToken: () => {},
  backendUrl: "",
  appointments: [],
  setAppointments: () => {},
  getAppointments: () => {},
  completeAppointment: (appointmentId: string) => {},
  cancelAppointment: (appointmentId: string) => {},
  getDoctorDashData: () => {},
  setProfileData: () => {},
  getProfileData: () => {},
  profileData: {
    _id: "",
    name: "",
    image: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    available: false,
    fees: 0,
    address: {
      line1: "",
      line2: "",
    },
    slots_booked: {},
  },
  dashData: {
    earning: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  },
};
interface DoctorContextProviderProps {
  children: ReactNode;
}

const DoctorContext = createContext(defaultValue);

const DoctorContextProvider: React.FC<DoctorContextProviderProps> = ({
  children,
}) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URl;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [dashData, setDashData] = useState<DoctorDashData>({
    earning: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: [],
  });
  const [profileData, setProfileData] = useState<Doctor>({
    _id: "",
    name: "",
    image: "",
    speciality: "",
    degree: "",
    experience: "",
    about: "",
    available: false,
    fees: 0,
    address: {
      line1: "",
      line2: "",
    },
    slots_booked: {},
  });

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/appointments",
        {
          headers: {
            dToken,
          },
        }
      );

      console.log("data:", data);

      if (data.success) {
        setAppointments(data.appointments.reverse()); // reverse set latest to first position
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  const completeAppointment = async (appointmentId: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/doctor/complete-appointment",
        {
          appointmentId,
        },
        {
          headers: {
            dToken,
          },
        }
      );

      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        getDoctorDashData();
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
        backendUrl + "/api/doctor/cancel-appointment",
        {
          appointmentId,
        },
        {
          headers: {
            dToken,
          },
        }
      );

      console.log("data", data);
      if (data.success) {
        toast.success(data.message);
        getDoctorDashData();
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getDoctorDashData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/doctor/doctor-dashboard",
        {
          headers: {
            dToken,
          },
        }
      );
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

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/profile", {
        headers: {
          dToken,
        },
      });

      if (data.success) {
        console.log("data.profileData", data.profileData);
        setProfileData(data.profileData);
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    getDoctorDashData,
    dashData,
    setDashData,
    profileData,
    getProfileData,
    setProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>{children}</DoctorContext.Provider>
  );
};

const useDoctorContext = () => {
  const context = useContext(DoctorContext);
  if (!context) {
    throw new Error(
      "useDoctorContext must be used within an DoctorContextProvider"
    );
  }
  return context;
};

export { DoctorContext, DoctorContextProvider, useDoctorContext };

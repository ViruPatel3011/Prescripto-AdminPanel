import { createContext, ReactNode } from "react";
import { AppContextType } from "../assets/assets";

const defaultValue: AppContextType = {
  calculateAge: (dob: string) => 0,
  currency: "",
  slotDateFormat: () => "",
};

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<AppContextType>(defaultValue);

const AppContextProvider: React.FC<AppContextProviderProps> = ({
  children,
}) => {
  const currency = "$";

  const calculateAge = (dob: string) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate: string) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const value = {
    calculateAge,
    currency,
    slotDateFormat
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;

import add_icon from './add_icon.svg'
import admin_logo from './admin_logo.svg'
import appointment_icon from './appointment_icon.svg'
import cancel_icon from './cancel_icon.svg'
import doctor_icon from './doctor_icon.svg'
import home_icon from './home_icon.svg'
import people_icon from './people_icon.svg'
import upload_area from './upload_area.svg'
import list_icon from './list_icon.svg'
import tick_icon from './tick_icon.svg'
import appointments_icon from './appointments_icon.svg'
import earning_icon from './earning_icon.svg'
import patients_icon from './patients_icon.svg'
import { Dispatch, SetStateAction } from 'react'

export const assets = {
    add_icon,
    admin_logo,
    appointment_icon,
    cancel_icon,
    doctor_icon,
    upload_area,
    home_icon,
    patients_icon,
    people_icon,
    list_icon,
    tick_icon,
    appointments_icon,
    earning_icon
}


interface Address {
    line1: string;
    line2: string;
}
export interface Doctor {
    _id: string;
    name: string;
    image: string;
    speciality: string;
    degree: string;
    experience: string;
    about: string;
    available: boolean;
    fees: number;
    address: Address;
    slots_booked: Record<string, string[]>;
}

export interface User {
    _id: string,
    name: string;
    email: string;
    image?: string;
    address: Address;
    gender: string;
    dob: string;
    phone: string;
}

export interface Appointment {
    _id: string,
    userId: string;
    docId: string;
    slotDate: string;
    slotTime: string;
    userData: User
    docData: Doctor;
    amount: number;
    date: number;
    cancelled: boolean;
    payment: boolean;
    isCompleted: boolean;

}

export interface DashData {
    doctors: number;
    appointments: number;
    patients: number;
    latestAppointments: Appointment[]

}

export interface AdminContextType {
    aToken: string | null;
    setAToken: (token: string) => void;
    backendUrl: string;
    doctors: Doctor[];
    getAllDoctors: () => void;
    changeAvailability: (docId: string) => void;
    getAllAppointments: () => void;
    appointments: Appointment[];
    setAppointments: Dispatch<SetStateAction<Appointment[]>>;
    cancelAppointment: (appointmentId: string) => void;
    dashData: DashData;
    getDashData: () => void;
}


export interface AppContextType {
    calculateAge: (dob: string) => number;
    currency: string;
    slotDateFormat: (slotDate: string) => string;
}
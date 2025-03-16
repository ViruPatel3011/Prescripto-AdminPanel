import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { AdminContextProvider } from "./context/AdminContext.tsx";
import DoctorContextProvider from "./context/DoctorContext.tsx";
import AppContextProvider from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <AdminContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdminContextProvider>
  </BrowserRouter>
);

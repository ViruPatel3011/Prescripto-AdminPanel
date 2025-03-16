import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.ts";
import { useAdminContext } from "../context/AdminContext.tsx";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");

  const { setAToken, backendUrl } = useAdminContext();

  console.log("backendUrl", backendUrl);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event: any) => {
    event.preventDefault();

    try {
      if (state === "Admin") {
        console.log("state:", state);

        const { data } = await axios.post(backendUrl + "/api/admin/login", {
          email,
          password,
        });
        console.log("data", data);

        if (data.success) {
          localStorage.setItem("aToken", data.token);
          setAToken(data.token);
        } else {
          toast.error(data.message);
        }
      } else {
      }
    } catch (error) {}
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state} </span>Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
            onChange={(e) => setEmail((e.target as HTMLInputElement).value)}
            value={email}
          />
        </div>

        <div className=" w-full">
          <p>Password</p>
          <input
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
            onChange={(e) => setPassword((e.target as HTMLInputElement).value)}
            value={password}
          />
        </div>

        <button className="bg-primary text-white w-full py-2 rounded-md text-base">
          Login
        </button>

        {state == "Admin" ? (
          <p>
            Doctor Login?
            <span
              onClick={() => setState("Doctor")}
              className="cursor-pointer text-primary underline ml-1"
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?
            <span
              onClick={() => setState("Admin")}
              className="cursor-pointer text-primary underline ml-1"
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;

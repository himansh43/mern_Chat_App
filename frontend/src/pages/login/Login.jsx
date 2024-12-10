import React from "react";
import { FaKey } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Signup from "../signup/Signup";
import { useAuthContext } from "../../context/AuthContext";
const Login = () => {
  const {setAuthUser}= useAuthContext()
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };
  console.log(inputs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("fetched successfully");
    setInputs({
      email: "",
      password: "",
    });

    const url = `http://localhost:3000/api/auth/login`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
  
      },
      body: JSON.stringify(inputs),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log("Login fetched data is",data);
    console.log("loginToken is", data.token)
    localStorage.setItem("ChatApp User Info", JSON.stringify(data));
    localStorage.setItem('jwtToken',data.jwtToken)
    setAuthUser(data)
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-2/6 h-fit">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="font-bold text-3xl text-orange-500">Login</h1>
          <form
            className="my-4 p-1"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="my-2 ">
              <label
                htmlFor="email"
                className="input input-bordered flex items-center gap-2 bg-slate-500 text-white"
              >
                <MdMarkEmailUnread />
                <input
                  type="text"
                  className="grow"
                  placeholder="Email"
                  autoComplete="off"
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                  value={inputs.email}
                  name="email"
                />
              </label>
            </div>
            <div className="my-2">
              <label
                htmlFor="password"
                className="input input-bordered flex items-center gap-2 bg-slate-500 text-white"
              >
                <FaKey />
                <input
                  type="text"
                  className="grow"
                  placeholder="password"
                  autoComplete="off"
                  onChange={(e) => {
                    handleInputs(e);
                  }}
                  value={inputs.password}
                  name="password"
                />
              </label>
            </div>

            <div>
              <button className="w-full btn btn-info text-xl">Login</button>
            </div>

            <div className="flex m-2">
              <p className="  text-orange-600 font-semibold">
                Don't have an Account?
              </p>
              <button className=" px-2 rounded-lg text-slate-950 font-extrabold ">
                {/* <a href="">Signup</a> */}
                {/* <NavLink to="Signup"/> */}
                <NavLink to="/signup">Signup</NavLink>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

import { ToastContainer } from 'react-toastify';

const Signup = () => {

  const {setAuthUser}= useAuthContext()
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    username: "",
    gender: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const handleInputs = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit successfully");

    console.log(inputs);
    const url = `http://localhost:3000/api/auth/signup`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
         
      },
      body: JSON.stringify(inputs),
    };

    const response = await fetch(url, options);
    console.log(response);
    const data = await response.json();
    console.log(data);
    localStorage.setItem("ChatApp User Info", JSON.stringify(data));
    console.log( localStorage.setItem("ChatApp User Info", JSON.stringify(data)))
    localStorage.setItem('jwtToken', data.jwtToken)
    setAuthUser(data)

   

    setInputs({
      name: "",
      email: "",
      username: "",
      gender: "",
      password: "",
      confirmPassword: "",
    });
    console.log("hey from signup");
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="w-2/6 h-screen my-10">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
          <h1 className="font-bold text-3xl text-orange-500">Signup</h1>
          <form
            className="my-4 p-1"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <div className="my-1 ">
              <label
                htmlFor="name"
                className="input input-bordered flex items-center gap-2 bg-slate-500 text-white "
              >
                <FaUser />
                <input
                  type="text"
                  className="grow bg-slate-500"
                  placeholder="Name"
                  onChange={handleInputs}
                  id="name"
                  name="name"
                  value={inputs.name}
                  autoComplete="off"
                />
              </label>
            </div>
            <div className="my-1 ">
              <label
                htmlFor="username"
                className="input input-bordered flex items-center gap-2 bg-slate-500 text-white"
              >
                <FaUserCircle />
                <input
                  type="text"
                  className="grow"
                  id="username"
                  placeholder="Username"
                  onChange={handleInputs}
                  name="username"
                  value={inputs.username}
                  autoComplete="off"
                />
              </label>
            </div>
            <div className="my-1 ">
              <label
                htmlFor="email"
                className="input input-bordered flex items-center gap-2 bg-slate-500 text-white"
              >
                <MdMarkEmailUnread />
                <input
                  type="text"
                  id="email"
                  className="grow"
                  placeholder="Email"
                  onChange={handleInputs}
                  name="email"
                  value={inputs.email}
                  autoComplete="off"
                />
              </label>
            </div>
            <div className="my-1 ">
              <label
                htmlFor="password"
                className="input input-bordered flex items-center gap-2 bg-slate-500 text-white"
              >
                <FaKey />
                <input
                  type="password"
                  id="password"
                  className="grow"
                  placeholder="password"
                  onChange={handleInputs}
                  name="password"
                  value={inputs.password}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="my-1">
              <label
                htmlFor="confirmPassword"
                className="input input-bordered flex items-center gap-2 bg-slate-500 text-white"
              >
                <FaKey />
                <input
                  type="password"
                  className="grow"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  onChange={handleInputs}
                  name="confirmPassword"
                  value={inputs.confirmPassword}
                  autoComplete="off"
                />
              </label>
            </div>

            <div className="my-1">
              <select
                className="w-full  flex items-center p-2 outline-none rounded-lg bg-slate-500 text-white"
                name="gender"
                id="gender"
                value={inputs.gender}
                onChange={(e) => {
                  handleInputs(e);
                }}
              >
                <option hidden>Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">other</option>
              </select>
            </div>

            <div>
              <button className="w-full btn btn-info text-xl">Signup</button>
            </div>
          </form>

          <div className="flex">
            <p className="  text-orange-600 font-semibold">
              Already have an Account?
            </p>
            <button className=" px-2 rounded-lg text-slate-950 font-extrabold ">
              <NavLink to="/">Login</NavLink>
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;

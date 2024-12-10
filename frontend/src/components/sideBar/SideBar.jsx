import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getRandomEmoji } from "../../utils/emoji";
import useMessages from "../../zustand/useMessages";
import { useSocketContext } from "../../context/SocketContext";

const SideBar = () => {
  const [users, setUsers] = useState("");

  const { messags, setMessages } = useMessages();
  const { selectedUser, setSelectedUser } = useMessages();
  const [search, setSearch] = useState("");

  const { authUser, setAuthUser } = useAuthContext();
  const { socket, onlineUsers } = useSocketContext();

  const LoggedInUserName = authUser.loggedInUser;
  const token = localStorage.getItem("jwtToken");

  // getUsers for SideBar
  const getUsersForSideBar = async (search = "") => {
    const url = `http://localhost:3000/api/users`;

    const options = {
      method: "GET",
      headers: {
        // Authorization: localStorage.getItem("jwtToken"),
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await fetch(url, options);
    const { users } = await response.json();
    setUsers(users);
  };
  useEffect(() => {
    getUsersForSideBar();
  }, []);

  const handleLogOut = async () => {
    const url = `http://localhost:3000/api/auth/logout`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    localStorage.removeItem("ChatApp User Info");
    localStorage.removeItem("jwtToken");
    setAuthUser(null);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search) return;
    const filteredUser = users.find((item) =>
      item.username.includes(search.toLowerCase())
    );
    console.log("filteredUser is", filteredUser);
    if (filteredUser) {
      setSelectedUser(filteredUser);
      setSearch("");
    }
  };

  return (
    <>
      <div className=" flex flex-col h-[560px] justify-between  rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <div>
          <div className="m-4">
            <div className="text-center flex justify-between mx-3 my-2  h-15">
              <div
                className={`flex avatar ${
                  onlineUsers.includes(authUser.loggedInUser._id)
                    ? "online"
                    : "offline"
                } w-12 h-12 text-center`}
              >
                <img
                  className="w-8 h-8"
                  src={LoggedInUserName.profileImage}
                  alt="profileImage"
                />
                <p className="text-white px-2">
                  Welcome {LoggedInUserName.username}
                </p>
              </div>

              <div>
                <button>
                  <BiLogOut
                    className="w-7 h-7 text-white"
                    onClick={handleLogOut}
                  />
                </button>
              </div>
            </div>

            <form onSubmit={handleSearch}>
              <label className="input input-bordered flex items-center gap-2 rounded-full">
                <input
                  type="text"
                  className="grow "
                  placeholder="Search for username..."
                  autoComplete="off"
                  value={search}
                  name="search"
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button type="submit">
                  <FaSearch />
                </button>
              </label>
            </form>
          </div>
          <hr className="solid" />

          {/* conversations or users */}
          <div className="h-[420px] overflow-auto">
            {Array.isArray(users) &&
              users?.map((user, _id) => (
                <div key={_id}>
                  <div
                    className="text-white flex justify-between w-80 m-3  hover:bg-sky-500 rounded p-1 py-2 cursor-pointer"
                    onClick={() => {
                      setSelectedUser(user);
                    }}
                  >
                    <div
                      className={`flex avatar ${
                        onlineUsers.includes(user._id) ? "online" : "offline"
                      } w-12 h-12`}
                    >
                      <img
                        className="w-8 h-8"
                        src={user.profileImage}
                        alt="pic"
                      />
                      <p className="px-3 text-white">{user.username}</p>
                    </div>
                    <span className="text-xl">{getRandomEmoji()}</span>
                  </div>
                  <div>
                    <hr className="solid" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBar;

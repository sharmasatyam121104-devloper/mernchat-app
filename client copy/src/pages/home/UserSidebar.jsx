import React from "react";
import Logo from "../../components/Logo";
import { IoMdSearch } from "react-icons/io";
import User from "./User";

import { useDispatch, useSelector } from "react-redux";
import { logoutUserThunk } from "../../store/slice/userSlice/user.thunk";
import { useNavigate } from "react-router-dom";

const UserSidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { otherUsers,userProfile } = useSelector((state) => state.user);
  // console.log(otherUsers);

  const handleLogout = async () => {
    const response = await dispatch(logoutUserThunk());
    if (response.payload?.success) {
      navigate("/login");
    } else {
      console.log("Logout failed", response.payload);
    }
  };

  return (
    <>
      <div className="max-w-[20rem] min-w-[20rem] h-screen flex flex-col p-1 hidden md:flex pr-2 bg-gray-950">
        {/* hidden on mobile, flex on md+ */}
        <div className="">
          <Logo />
        </div>
        <div className="my-2">
          <label className="input">
            <IoMdSearch />
            <input type="search" required placeholder="Search" />
          </label>
        </div>
        <div className="h-full overflow-y-scroll">
          {otherUsers?.map((userDetails) => {
            return <User userDetails={userDetails} key={userDetails?._id} />;
          })}
        </div>
        <div className="h-18 flex items-center p-2 rounded-2xl gap-2 w-full">
          <div className="avatar flex items-center justify-center mt-2  w-full">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2 flex items-center ">
              <img src={userProfile?.avatar}/>
            </div>
          <div className=" w-39 p-2 h-15 ">
                <h1 className="font-medium text-m">
                    {userProfile?.fullname
                      ? userProfile.fullname
                          .split(" ")
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")
                      : ""}
                  </h1>
                <h2 className="font-sans text-gray-400">{userProfile?.email}</h2>
              </div>
          </div>
          <button onClick={handleLogout} className="btn btn-primary mt-1.5">
            LogOut
          </button>
        </div>
      </div>
    </>
  );
};

export default UserSidebar;

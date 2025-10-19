import React, { useEffect } from 'react';
import Logo from '../../components/Logo';
import { IoMdSearch } from "react-icons/io";
import User from "./User";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUserThunk } from '../../store/slice/userSlice/user.thunk';

const MobileSidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { otherUsers,userProfile } = useSelector((state) => state.user);

  
  

  const handleLogout = async () => {
    const response = await dispatch(logoutUserThunk());
    if (response.payload?.success) {
      navigate('/login');
    } else {
      console.log("Logout failed", response.payload);
    }
  }

  // Yeh effect mobile se bada hote hi home page navigate karega
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint ke liye usually 768px
        navigate('/');
      }
    };

    window.addEventListener('resize', handleResize);

    // initial check
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [navigate]);

  return (
    <div>
      <div className="w-full h-screen flex flex-col p-1 md:hidden">
        <div>
          <Logo />
        </div>
        <div className="my-2 w-full">
          <label className="input w-full">
            <IoMdSearch />
            <input type="search" required placeholder="Search" />
          </label>
        </div>
        <NavLink to={"/"} className="h-full overflow-y-scroll">
          {otherUsers?.map((userDetails) => {
            return <User userDetails={userDetails} key={userDetails?._id} />;
          })}
        </NavLink>
        <div className="h-18 flex items-center justify-between p-6 rounded-2xl gap-2">
          <div className="avatar flex items-center mt-2">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2 flex items-center">
              <img src={userProfile?.avatar} />
            </div>
            <div className=" w-45 p-2 h-15 ">
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
    </div>
  );
}

export default MobileSidebar;

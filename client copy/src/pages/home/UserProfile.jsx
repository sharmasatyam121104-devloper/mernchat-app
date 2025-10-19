import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfileThunk } from "../../store/slice/userSlice/user.thunk";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userProfile, screenLoading } = useSelector((state) => state.user);

  // Fetch profile only if not already loaded
  useEffect(() => {
    if (!userProfile?._id) {
      dispatch(getUserProfileThunk());
    }
  }, [dispatch, userProfile?._id]);

  // Show loading spinner or fallback
  if (screenLoading || !userProfile?._id) {
    return (
      <div className="flex items-center justify-center h-screen text-white text-xl">
        Loading profile...
      </div>
    );
  }

  // ✅ Profile UI
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden ring-2 ring-blue-500">
          <img
            src={
              userProfile?.avatar ||
              "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
            }
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold mt-4">
          {userProfile?.fullname || "Unnamed User"}
        </h2>
        <p className="text-gray-400 mt-1">{userProfile?.email}</p>
        <p className="text-sm mt-2">
          Joined:{" "}
          {new Date(userProfile?.createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;

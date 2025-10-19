import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectUser } from '../../store/slice/userSlice/user.slice';

const User = ({ userDetails }) => {

  const disptach = useDispatch();
  const {selectedUsers} = useSelector(state=>state.user)
  const { onlineUser } = useSelector(state => state.socketReducer);
  const isUserOnline= onlineUser?.includes(userDetails?._id);
  
  // console.log(selectedUsers);


  const handleUserClick=()=>{
    disptach(setSelectUser(userDetails));

  }

  if (!userDetails) return null;

  const avatarUrl = userDetails?.avatar || "https://img.daisyui.com/images/profile/demo/gordon@192.webp";

    const isSelected = setSelectUser?._id === userDetails._id;

  return (
    // <div onClick={handleUserClick} className='flex items-center gap-5 p-2 hover:bg-gray-400 bg-gray-800 cursor-pointer border-b border-b-white/10'>
        <div
  onClick={handleUserClick}
className={`
  flex items-center gap-5 p-2 cursor-pointer border-b border-b-white/10
  w-full md:w-full sm:w-auto  /* sm pe auto width, md+ pe full */
  ${userDetails?._id === selectedUsers?._id 
    ? "md:bg-gray-400 sm:bg-transparent"  /* selected: md+ gray, sm transparent */
    : "md:bg-gray-800 md:hover:bg-gray-400 sm:bg-transparent sm:hover:bg-transparent"
  }`}

>

      <div className={`avatar ${isUserOnline && 'avatar-online'}`}>
        <div className="w-12 rounded-full">
          <img src={avatarUrl} alt={userDetails.fullname} />
        </div>
      </div>

      <div className='flex flex-col items-start'>
        <h2 className="text-white font-semibold">{userDetails.fullname}</h2>
        <p className="text-sm text-gray-300">{userDetails.email}</p>
      </div>
    </div>
  );
};

export default User;

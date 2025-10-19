import React, { useState } from 'react';
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessageThunk } from '../../store/slice/messageSlice/message.thunk';

const SendMessage = () => {
  const [message, setMsg] = useState("");

  const dispatch = useDispatch();
  const { selectedUsers,userProfile } = useSelector((state) => state.user);

  const handleSendMsg = () => {
    if (!message.trim()) return; // avoid empty message
    // console.log(message);
    // console.log(selectedUsers?._id);
    // console.log(userProfile?._id);
  
    dispatch(
      sendMessageThunk({
         senderId: userProfile?._id,
        recieverId: selectedUsers?._id,
        
        message,
      })
    );

    setMsg("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMsg();
    }
  };



  return (
    <div>
      <div className="w-full h-full flex gap-5">
        <input
          type="text"
          placeholder="Enter Your Message"
          value={message}
          className="input input-primary w-full p-6 px-6"
          onChange={(e) => setMsg(e.target.value)}
          onKeyDown={handleKeyDown}   // 👈 Enter press listener
        />
        <button
          onClick={handleSendMsg}
       className="btn btn-active btn-primary h-13 sm:h-full w-20 sm:w-[5%] mr-2 text-green-400"


        >
          <IoSendSharp className=''/>
        </button>
      </div>
    </div>
  );
};

export default SendMessage;

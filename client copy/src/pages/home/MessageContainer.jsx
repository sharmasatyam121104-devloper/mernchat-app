;

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { IoArrowBack, IoSendSharp } from "react-icons/io5";
import User from "./User";
import Massage from "./Massage";
import SendMessage from "./SendMessage";
import Logo from "../../components/Logo";
import { getMessageThunk } from "../../store/slice/messageSlice/message.thunk";
import { getUserProfileThunk } from "../../store/slice/userSlice/user.thunk";

const MessageContainer = () => {
  const dispatch = useDispatch();
  const { selectedUsers, userProfile } = useSelector((state) => state.user);
  const { messages } = useSelector((state) => state.messages);

  const laptopRef = useRef();
  const mobileRef = useRef();

  // ✅ Ensure userProfile is loaded
  useEffect(() => {
    if (!userProfile?._id) {
      dispatch(getUserProfileThunk());
    }
  }, [dispatch, userProfile?._id]);

  // ✅ Fetch messages when both users are available
  useEffect(() => {
    if (selectedUsers?._id && userProfile?._id) {
      dispatch(getMessageThunk({ recieverId: selectedUsers._id }));
    }
  }, [dispatch, selectedUsers?._id, userProfile?._id]);

  // ✅ Scroll to bottom on new messages
  useEffect(() => {
    if (messages?.length > 0) {
      if (laptopRef.current) {
        laptopRef.current.scrollTop = laptopRef.current.scrollHeight;
      }
      if (mobileRef.current) {
        mobileRef.current.scrollTop = mobileRef.current.scrollHeight;
      }
    }
  }, [messages]);

  // ✅ Fallback if no user selected
  if (!selectedUsers) {
    return (
      <div className="flex flex-col items-center justify-center m-20 mx-auto p-8">
        <NavLink
          to={"/mobile-sidebar"}
          className="text-xl text-blue-400 font-semibold mb-2"
        >
          ← Start a Conversation
        </NavLink>
        <h2 className="text-4xl font-extrabold text-gray-100 text-center">
          Please Select a User
        </h2>
        <p className="text-gray-500 text-center mt-4 text-lg">
          Your messages will load in this space.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* 💻 Laptop View */}
      <div className="w-full h-screen overflow-y-hidden flex flex-col hidden md:flex">
        <div className="border-b border-b-white/10 flex justify-between mr-4">
          <User userDetails={selectedUsers} />
          <Logo />
        </div>
        <div
          ref={laptopRef}
          className="h-full overflow-y-auto p-4 flex flex-col"
        >
          {userProfile?._id &&
            messages?.map((messageDetails) => (
              <Massage
                key={messageDetails._id}
                messageDetails={messageDetails}
              />
            ))}
        </div>
        <SendMessage />
      </div>

      {/* 📱 Mobile View */}
      <div className="w-full h-screen overflow-y-hidden flex flex-col md:hidden">
        <div className="border-b border-b-white/10 flex justify-between p-2">
          <NavLink className="text-4xl w-fit" to={"/mobile-sidebar"}>
            <IoArrowBack />
          </NavLink>
          <div className="flex justify-between w-full">
            <div className="w-fit rounded-2xl">
              <User userDetails={selectedUsers} />
            </div>
            <Logo />
          </div>
        </div>
        <div
          ref={mobileRef}
          className="h-full overflow-y-auto p-4 flex flex-col"
        >
          {userProfile?._id &&
            messages?.map((messageDetails) => (
              <Massage
                key={messageDetails._id}
                messageDetails={messageDetails}
              />
            ))}
        </div>
        <SendMessage />
      </div>
    </div>
  );
};

export default MessageContainer;




import React from "react";
import { useSelector } from "react-redux";

const Massage = ({ messageDetails }) => {
  const { userProfile, selectedUsers } = useSelector((state) => state.user);

  // 🛡️ Guard: Avoid rendering if profile or message is missing
  if (!userProfile?._id || !messageDetails?.senderId) {
    return null;
  }

  // ✅ Check if current user is the sender
  const isSender = userProfile._id === messageDetails.senderId;

  return (
    <div>
      {isSender ? (
        // 💬 Message sent by current user
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Your avatar"
                src={
                  userProfile?.avatar ||
                  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                }
              />
            </div>
          </div>
          <div className="chat-header font-semibold text-sm">
            You
            <time className="text-xs opacity-50 ml-2">
              {new Date(messageDetails?.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </div>
          <div className="chat-bubble bg-blue-600 text-white">
            {messageDetails?.message}
          </div>
          <div className="chat-footer opacity-50">Delivered</div>
        </div>
      ) : (
        // 💬 Message received by current user
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Sender avatar"
                src={
                  selectedUsers?.avatar ||
                  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                }
              />
            </div>
          </div>
          <div className="chat-header font-semibold text-sm">
            {selectedUsers?.fullname || "Friend"}
            <time className="text-xs opacity-50 ml-2">
              {new Date(messageDetails?.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </time>
          </div>
          <div className="chat-bubble bg-gray-700 text-white">
            {messageDetails?.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default Massage;


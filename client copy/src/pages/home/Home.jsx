import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import UserSidebar from "./UserSidebar";
import MessageContainer from "./MessageContainer";
import { initializeSocket, setOnlineUser } from "../../store/slice/socket/socket.slice.js";
import { setNewMessage } from "../../store/slice/messageSlice/messageSlice.js";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userProfile } = useSelector((state) => state.user);
  const { socket, onlineUser } = useSelector((state) => state.socketReducer);

  // console.log("Online users in Home:", onlineUser);

  // ✅ Initialize socket when authenticated
  useEffect(() => {
    if (!isAuthenticated || !userProfile?._id) return;
    dispatch(initializeSocket(userProfile._id));
  }, [isAuthenticated, userProfile?._id]);

  // ✅ Listen for online users and new messages
  useEffect(() => {
    if (!socket) return;

    // when someone comes online/offline
    const handleOnlineUsers = (users) => {
      dispatch(setOnlineUser(users));
    };

    // when new message is received
    const handleNewMessage = (newMessage) => {
      // console.log("New message received:", newMessage);
      //  later tu yahan message store me dispatch karega, e.g.:
      dispatch(setNewMessage(newMessage));
    };

    socket.on("onlineUser", handleOnlineUsers);
    socket.on("newMessage", handleNewMessage); // correct event name

    // cleanup
    return () => {
      socket.off("onlineUser", handleOnlineUsers);
      socket.off("newMessage", handleNewMessage);
      socket.disconnect();
      // console.log("Socket disconnected from Home cleanup");
    };
  }, [socket, dispatch]);

  return (
    <div className="flex overflow-y-hidden h-[95%] mb-2">
      <UserSidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;

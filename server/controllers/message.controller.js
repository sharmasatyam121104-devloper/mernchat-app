import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getSocketId, io } from "../Socket.io/socket.js";
import { asyncHandler } from "../utilities/asyncHandler.utility.js";
import ErrorHandler from "../utilities/errorHandler.utility.js";

// controller of send message
export const sendMessageController = asyncHandler(async (req, res, next) => {
  const senderId = req.user;
  const reciverId = req.params.reciverId;
  const message = req.body.message;

  if (!senderId || !reciverId || !message) {
    return next(new ErrorHandler("All fileds are required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, reciverId] },
  });

  if (!conversation) {
    conversation = await Conversation.create({
      participants: [senderId, reciverId],
    });
  }

  const newMessage = await Message.create({
    senderId,
    reciverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
    await conversation.save();
  }
  //socket
  const socketId = getSocketId(reciverId)
  io.to(socketId).emit("newMessage",newMessage);

  res.status(200).json({
    success: true,
    responseData: newMessage,
  });
});

// controller of send message
export const reciveMessageController = asyncHandler(async (req, res, next) => {
  const myId = req.user;
  const otherParticipentId = req.params.otherParticipentId;

  if (!myId || !otherParticipentId) {
    return next(new ErrorHandler("All fileds are required", 400));
  }

  let conversation = await Conversation.findOne({
    participants: { $all: [myId, otherParticipentId] },
  }).populate("messages");

  res.status(200).json({
    success: true,
    responseData: conversation,
  });
});

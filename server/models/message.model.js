import mongoose from "mongoose";

const messageSchema  = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // kisne bheja
    required: true,
  },
  reciverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // kisko bheja
    required: true,
  },
  message: {
    type: String,
    required: true, // actual message text
    trim: true,
  },
//   messageType: {
//     type: String,
//     enum: ["text", "image", "video", "file"], // kis type ka message hai
//     default: "text",
//   },
  createdAt: {
    type: Date,
    default: Date.now, // message bhejne ka time
  },
  isRead: {
    type: Boolean,
    default: false, // read/unread status
  }
},{timestamps:true});


const Message = mongoose.model("Message", messageSchema);

export default Message;

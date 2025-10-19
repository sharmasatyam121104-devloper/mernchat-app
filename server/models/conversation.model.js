import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // chat me kaun kaun hai
      required: true,
    },
  ],
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message", // is conversation ke sare messages
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// updatedAt ko update karne ke liye
conversationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;

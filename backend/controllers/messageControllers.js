const messageModel = require("../models/messageSchema");
const conversationModel = require("../models/conversationSchema");
const { getReceiverSocketId, io } = require('../socket/socket')
const sendMessages = async (req, res) => {

  try {
    const {chat}  = req.body;
    const receiverId = req.params.id;
    const senderId = req.user._id;
    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await conversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new messageModel({ chat, receiverId, senderId });
    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }
    //  await newMessage.save();
    //  await conversation.save()
    //or we can write above code like this

    await Promise.all([conversation.save(), newMessage.save()]);
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json({ newMessage, status: true });
  } catch (error) {
 
    res.status(500).json({ error: error,message:"Internal server error", status: false });
  }
};

const getMessages = async (req, res) => {
  try {
    const receiverId = req.params.id;
    console.log(receiverId)
    const senderId = req.user.id;
    console.log(senderId)
    const conversation = await conversationModel
      .findOne({ participants: { $all: [senderId, receiverId] } })
      .populate("messages");
    if (!conversation) return res.status(200).json([]);
    const messages = conversation.messages;
    return res.status(200).json({messages:messages, success:true, message:"succesfully fetched chat between sender and receiver"});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server Error", success: false, error: error });
  }
};

module.exports = { sendMessages, getMessages };

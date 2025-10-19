import express from 'express'
import { isAuthentication } from '../middlewares/auth.middleware.js'
import { reciveMessageController, sendMessageController } from '../controllers/message.controller.js'




const Messagerouter = express.Router()

Messagerouter.post("/send/:reciverId" , isAuthentication , sendMessageController)
Messagerouter.get("/get-message/:otherParticipentId" , isAuthentication , reciveMessageController)

export default Messagerouter;

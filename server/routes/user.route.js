import express from 'express'
import {getOtherUserController, getProfileUser, loginUser, logOutUser, registerUser } from '../controllers/user.controller.js'
import { isAuthentication } from '../middlewares/auth.middleware.js'




const router = express.Router()

router.post('/register',registerUser)
router.post('/login', loginUser)
router.post('/login', loginUser)
router.get('/get-profile',isAuthentication, getProfileUser)
router.get('/logout',isAuthentication,logOutUser)
router.get('/get-other-users', isAuthentication , getOtherUserController)

export default router;

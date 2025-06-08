import express from 'express'
import { loginUser,registerUser,adminLogin, addReview } from '../controllers/userController.js'
 

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.post('/addReview',addReview)

export default userRouter;
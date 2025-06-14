import express from 'express'
import { allOrders, placeOrder, updateStatus, userOrders } from '../controllers/orderController.js';
import adminAuth from './../middleware/adminAuth.js';
import authUser from './../middleware/auth.js';

const orderRouter = express.Router();

orderRouter.get('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

orderRouter.post('/place',authUser,placeOrder)

orderRouter.get('/userOrders',authUser,userOrders)

export default orderRouter;

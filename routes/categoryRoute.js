import express from 'express'
import { addCategory, editCategory, listCategory, removeCategory } from '../controllers/categoryController.js';
import adminAuth from './../middleware/adminAuth.js';

const categoryRoute = express.Router()

categoryRoute.post('/add',adminAuth,addCategory);
categoryRoute.delete('/remove',adminAuth,removeCategory);
categoryRoute.get('/list',listCategory);
categoryRoute.put('/edit',adminAuth,editCategory);

export default categoryRoute;
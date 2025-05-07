import express from 'express'
import { addCategory, listCategory, removeCategory } from '../controllers/categoryController.js';

const categoryRoute = express.Router()

categoryRoute.post('/add',addCategory);
categoryRoute.post('/remove',removeCategory);
categoryRoute.post('/list',listCategory);

export default categoryRoute;
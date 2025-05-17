import express from 'express'
import { addCategory, editCategory, listCategory, removeCategory } from '../controllers/categoryController.js';

const categoryRoute = express.Router()

categoryRoute.post('/add',addCategory);
categoryRoute.post('/remove',removeCategory);
categoryRoute.post('/list',listCategory);
categoryRoute.post('/edit',editCategory);

export default categoryRoute;
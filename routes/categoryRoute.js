import express from 'express'
import { addCategory, editCategory, listCategory, removeCategory } from '../controllers/categoryController.js';

const categoryRoute = express.Router()

categoryRoute.post('/add',addCategory);
categoryRoute.delete('/remove',removeCategory);
categoryRoute.get('/list',listCategory);
categoryRoute.put('/edit',editCategory);

export default categoryRoute;
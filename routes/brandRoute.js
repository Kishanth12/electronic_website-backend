import express from 'express'
import { addBrand, editBrand, listBrand, removeBrand } from '../controllers/brandController.js';
import adminAuth from './../middleware/adminAuth.js';

const brandRoute = express.Router();

brandRoute.post('/add',adminAuth,addBrand);
brandRoute.get('/list',listBrand)
brandRoute.delete('/remove',adminAuth,removeBrand)
brandRoute.put('/edit',adminAuth,editBrand)



export default brandRoute;
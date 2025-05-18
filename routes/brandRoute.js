import express from 'express'
import { addBrand, editBrand, listBrand, removeBrand } from '../controllers/brandController.js';

const brandRoute = express.Router();

brandRoute.post('/add',addBrand);
brandRoute.get('/list',listBrand)
brandRoute.delete('/remove',removeBrand)
brandRoute.put('/edit',editBrand)



export default brandRoute;
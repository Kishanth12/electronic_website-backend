import express from 'express'
import { addBrand, listBrand, removeBrand } from '../controllers/brandController.js';

const brandRoute = express.Router();

brandRoute.post('/add',addBrand);
brandRoute.post('/list',listBrand)
brandRoute.post('/remove',removeBrand)


export default brandRoute;
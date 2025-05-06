import express from 'express'

const brandRoute = express.Router();

brandRoute.post('/add');
brandRoute.post('/list')
brandRoute.post('/remove')


export default brandRoute;
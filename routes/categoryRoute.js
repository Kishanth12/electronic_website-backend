import express from 'express'

const categoryRoute = express.Router()

categoryRoute.post('/add');
categoryRoute.post('/remove');
categoryRoute.post('/list');

export default categoryRoute;
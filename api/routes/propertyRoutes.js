const propertyRoutes      = require('express').Router(),
      propertyController  = require('../controllers/propertyController');


propertyRoutes.get('/', propertyController.getAll);
propertyRoutes.post('/add', propertyController.newProperty);


module.exports = propertyRoutes;
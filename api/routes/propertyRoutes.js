const propertyRoutes      = require('express').Router(),
      propertyController  = require('../controllers/propertyController');


propertyRoutes.post('/add', propertyController.newProperty);


module.exports = propertyRoutes;
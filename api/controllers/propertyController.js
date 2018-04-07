const mongoose = require('mongoose'),
      _        = require('lodash'),
      Property = mongoose.model('Property');

const propertyController = {
  newProperty : (req, res) => {
    let body = _.pick(req.body, ['title', 'bedrooms', 'rent', 'pictures', 'address', 'coordinates']);

    const new_property = new Property(body);
    new_property.save()
      .then(() => {
        res.send(new_property);
      })
      .catch(err => {
        res.send(err);
      })
  }
};

module.exports = propertyController;
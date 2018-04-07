import React from 'react';

const AddProperty = props => {
  const { title, bedrooms, rent, address, handleInputChange, handleSubmitProperty } = props;
  return (
    <div className="container add-property">
      <div className="col-md-8 col-sm-offset-1">
        <form role="form" onSubmit={handleSubmitProperty}>
          <div className="form-group">
            <input 
              type="text"
              name="title"
              placeholder="Property name ... (bedroom, condo, building ....)"
              className="form-control"
              value={title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="bedrooms"
              placeholder="bedrooms ... (1, 2, 3)"
              className="form-control"
              value={bedrooms}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="rent"
              placeholder="Total rent ... ($700, $900 ...)"
              className="form-control"
              onChange={handleInputChange}
              value={rent}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Address... (123 main st, Flushing, NY 11355)"
              className="form-control"
              value={address}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="btn">Submit!</button>
        </form>
      </div>
    </div>
  )
};

export default AddProperty;


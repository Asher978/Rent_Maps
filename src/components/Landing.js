import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Typography from 'material-ui/Typography';

class Landing extends Component {

  render () {
    return (
      <div>
        <div className="hero">
          <Typography>
            See Actual Rent Data Across San Francisco & New York
          </Typography>          
        </div>
      </div>
      
    )
  }
}

export default withStyles()(Landing)
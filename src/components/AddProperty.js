import React, {Component} from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';

class AddProperty extends Component {

  render() {
    const { title, bedrooms, rent, address, handleInputChange, handleSubmitProperty, handleDecidePage } = this.props;
    return (
      <Dialog open>
        <DialogTitle>Property Information</DialogTitle>
        <DialogContent>

          <DialogContentText>
            Thank you in advance for providing information on your property. Please be assured that we will never share your personal credentials if there were any provided. 
          </DialogContentText>

          <TextField
            margin="dense"
            name="title"
            label="Property name ... (bedroom, condo, building ....)"
            type="text"
            value={title}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="bedrooms"
            label="No of bedrooms ... (1, 2, 3)"
            type="number"
            value={bedrooms}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="rent"
            label="Total rent ... ($700, $900 ...)"
            type="number"
            value={rent}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="address"
            label="Address... (123 main st, Flushing, NY 11355)"
            type="text"
            value={address}
            onChange={handleInputChange}
            fullWidth
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDecidePage("LAND")} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmitProperty} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(AddProperty);
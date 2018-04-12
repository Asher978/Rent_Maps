import React, {Component} from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { InputAdornment } from 'material-ui/Input';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog
} from 'material-ui/Dialog';

class AddProperty extends Component {

  render() {
    const { title, bedrooms, rent, address, handleInputChange, handleSubmitProperty, handleDecidePage, fullScreen } = this.props;
    return (
      <Dialog open aria-labelledby="responsive-dialog-title" fullScreen={fullScreen}>
        <DialogTitle>Property Information</DialogTitle>
        <DialogContent>

          <DialogContentText>
            Thank you in advance for providing information on your property. Please be assured that we will never share your personal credentials if there were any provided. 
          </DialogContentText>

          <TextField
            InputLabelProps={{ style: { fontSize: '.7rem', } }}
            name="title"
            label="Property name ... (bedroom, condo, building ....)"
            type="text"
            value={title}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            InputLabelProps={{ style: { fontSize: '.7rem', } }}
            name="bedrooms"
            label="No of bedrooms ... (1, 2, 3)"
            type="number"
            value={bedrooms}
            onChange={handleInputChange}
            fullWidth
          />

          <TextField
            InputLabelProps={{ style: { fontSize: '.7rem', } }}
            name="rent"
            label="Total rent ... ($700, $900 ...)"
            type="number"
            value={rent}
            onChange={handleInputChange}
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            fullWidth
          />

          <TextField
            InputLabelProps={{ style: { fontSize: '.7rem', } }}
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
import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AddCircle from 'material-ui-icons/AddCircle';
import ZoomOutMap from 'material-ui-icons/ZoomOutMap';

class MyDrawer extends Component {


  handleDecide = (page) => {
    this.props.toggleDrawer()
    this.props.handleDecidePage(page);
  }

  render () {
    const { handleDecidePage } = this.props;
    return (
      <Drawer
        open={this.props.open} 
        onClose={this.props.toggleDrawer}
        type="persistent"
        >
        <div tabIndex={0}>
          <List>
            <ListItem button onClick={() => this.handleDecide("ADD")}>
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="Add a Property" />
            </ListItem>
            <Divider/>
            <ListItem button onClick={() => this.handleDecide("MAP")}>
              <ListItemIcon>
                <ZoomOutMap />
              </ListItemIcon>
              <ListItemText primary="View Properties on the Map" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    )
  }
}

export default MyDrawer;
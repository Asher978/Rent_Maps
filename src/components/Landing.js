import React, { Component } from 'react';
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Image from '../assets/main.jpg';
import GreyMap from '../assets/grey_map.svg';
import Landlord from '../assets/landlord.svg';
import House from '../assets/light_grey_house.svg';

class Landing extends Component {

  render () {
    const { classes } = this.props;
    return (
      <div>
        <Grid item xs={12}>
          <Paper className="hero">
            <Typography className="hero__heading">
              See Actual Rent Data Across San Francisco & New York
            </Typography>
          </Paper>
        </Grid>
        <Divider light />
        <Grid container justify="center" align="center" spacing={24} className="card__container">
          <Grid item>
          <Card raised className="landing__card">
            <CardMedia
              className="card__media"
              image={Landlord}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom className="card__text" variant="headline" component="h2">
                Leverage
              </Typography>
              <Typography component="p">
              The rental market in San Francisco is heavily weighted in favor of property owners. Prospective tenants are expected to silently accept listing prices.
              </Typography>
            </CardContent>
          </Card>
          </Grid>

          <Grid item>
          <Card raised className="landing__card">
            <CardMedia
              className="card__media"
              image={House}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography className="card__text" gutterBottom variant="headline" component="h2">
                Insight
              </Typography>
              <Typography component="p">
              Without knowing what your neighbors are actually paying, the realator has complete leverage over the tenant. Are forever rising rent prices the result of poor price transparency?
              </Typography>
            </CardContent>
          </Card>
          </Grid>

          <Grid item>
          <Card raised className="landing__card">
            <CardMedia
              className="card__media"
              image={GreyMap}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom className="card__text" variant="headline" component="h2">
                Transparency
              </Typography>
              <Typography component="p">
              SF Rent Index is an attempt to foster price transparency in San Francisco's rental market without sacraficing the anonimity of its users. Everyone benefits if everyone participates.
              </Typography>
            </CardContent>
          </Card>
          </Grid>
        </Grid>
      </div>
      
    )
  }
}

export default Landing;
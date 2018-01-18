import React from 'react';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import axios from 'axios';

const style = {
  card: {
    position: 'relative',
    width: '100%',
    display: 'inline-block',
  },
  title: {
    fontWeight: 700,
    fontSize: '20px',
    margin: '10px'
  }
};

class ProfileHeader extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      toggled: this.props.profileInfo.twofactor
    }
  }

  updateTwoFactorChoice() {
    axios.post('/dillon/enable2factorauth', {
      username: this.props.profileInfo.username,
      currentAuth: !this.props.profileInfo.twofactor
    })
    .then((response) => {
      console.log('This is the response we get back from twofactortoggle', response);
    })
    .catch((error) => {
      console.log('This is the error from updateTwoFactorChoice', error);
    })
  }

  onToggle2FactorAuth() {
    this.setState({toggled: !this.state.toggled});
    this.props.twoFactorAuthToggle();
    this.updateTwoFactorChoice();
    this.props.loadProfileData(this.props.profileInfo.username);
  }

  render() {
    return (
      <Paper className='feed-container'>
        <Card>
          <CardHeader
            title={
              <div>
                <span style={style.title}>{this.props.profileInfo.fullName}</span>
                <span> ({this.props.profileInfo.username})</span>
              </div>
            }
            subtitle={
              <div className='member-tag'>
                Member since : {moment(this.props.profileInfo.createdAt).format('MMMM Do YYYY')}
              </div>
            }
            avatar={ <Avatar size={100} src={this.props.profileInfo.avatarUrl || '/images/no-image.gif'}/> }
            />
            <Toggle label="Enable Two Factor Authentication" labelPosition="right" toggled={this.state.toggled} onToggle={this.onToggle2FactorAuth.bind(this)}/>
        </Card>
      </Paper>
    );
  }
}

export default ProfileHeader;

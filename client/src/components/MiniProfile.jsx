import React from 'react';
import Avatar from 'material-ui/Avatar';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import LiveLoan from './LiveLoan.jsx';
import Refer from './Referral.jsx';

const style = {
  card: {
    position: 'relative',
    width: '100%',
    display: 'inline-block',
    fontWeight: 700,
    fontSize: '18px',
  },
  title: {
    fontWeight: 700,
    fontSize: '20px',
    margin: '10px'
  },
  balance: {
    marginLeft: '125px',
    fontSize: '18px',
  }
};

class MiniProfile extends React.Component {
  constructor (props) {
    super(props);
  }

  render() {
    return (
      <Paper className='feed-container'>
        <Card>
          <CardHeader
            title={
              <div>
                <span style={style.title}>{this.props.userInfo.displayName}</span>
              </div>
            }
            subtitle={
              <div className='member-tag'>
                <span> ({this.props.userInfo.username})</span>
              </div>
            }
            avatar={
              <Avatar 
                size={100} 
                src={this.props.userInfo.avatarUrl || '/images/no-image.gif'}
              />
            }
            />
          <Divider />
          <CardText style={style.balance}>
            <strong>${this.props.balance}</strong>
          </CardText>
          <LiveLoan socket={this.props.socket} userInfo={this.props.userInfo} refreshUserData={this.props.refreshUserData}/>
        </Card>

        <Card>
          <Refer
            userInfo ={this.props.userInfo}
          />
          <CardText style={style.balance}>
            <strong>refer a friend and win $20</strong>
          </CardText>
        </Card>
        

      </Paper>
    );
  }
}

export default MiniProfile;


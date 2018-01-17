import React from 'react';
import Feed from './Feed.jsx'
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

class FeedContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: false,
      history: ''
    };
    axios('/feed/all', {params: {userId: this.props.userId}})
      .then((results) =>{
        this.setState({history: JSON.stringify(results.data.items)});
      });
  }

  handleOpen () {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false});
  };

  render() {
    let buttons = [];
    let feedComponent;
    let viewToDisplay = this.props.view || this.props.feeds[0].urlParam

    this.props.feeds.forEach((feed) => {

      buttons.push(
        <Link to={`${this.props.base}?view=${feed.urlParam}`} key={feed.urlParam}>
          <button className={viewToDisplay === feed.urlParam ? 'feed-buttons selected' : 'feed-buttons'} >
            {feed.displayLabel}
          </button>
        </Link>
      );

      if (viewToDisplay === feed.urlParam) {
        feedComponent = <Feed
            type={feed.feedType}
            transactions={feed.data}
            userId={this.props.userId}
            loadMoreFeed={this.props.loadMoreFeed} />
      }
    });

    return (
      <Paper className='feed-container'>
        <div className='feed-selections'>
          {buttons}
          <button className='feed-buttons history' onClick={this.handleOpen.bind(this)} >
            EXPORT
          </button>
          <Dialog
            title="Payment history"
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose.bind(this)}
            autoScrollBodyContent={true}
          >
            {this.state.history}
          </Dialog>
        </div>
        {feedComponent}
      </Paper>
    );
  }
}

export default FeedContainer;

import React from 'react';
import Feed from './Feed.jsx'
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';

const FeedContainer = (props) => {

handleOpen () {
  this.setState({open: true});
};

handleClose () {
  this.setState({open: false});
};

  let buttons = [];
  let feedComponent;
  let viewToDisplay = props.view || orderedFeeds[0].urlParam

  let orderedFeeds = [
    {
      displayLabel: 'mine',
      urlParam: 'mine',
      feedType: 'userFeed',
      data: props.userFeed
    },
    {
      displayLabel: 'public',
      urlParam: 'public',
      feedType: 'globalFeed',
      data: props.globalFeed
    }
  ];
  orderedFeeds.forEach((feed) => {

    buttons.push(
      <Link to={`${props.base}?view=${feed.urlParam}`} key={feed.urlParam}>
        <button className={viewToDisplay === feed.urlParam ? 'feed-buttons selected' : 'feed-buttons'} >
          {feed.displayLabel}
        </button>
      </Link>
    );

    if (viewToDisplay === feed.urlParam) {
      feedComponent = <Feed
          type={feed.feedType}
          transactions={feed.data}
          loadMoreFeed={props.loadMoreFeed} />
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
          open={this.props.open}
          onRequestClose={this.handleClose.bind(this)}
          autoScrollBodyContent={true}
        >
          {props.history}
        </Dialog>
      </div>
      {feedComponent}
    </Paper>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.userInfo.userId,
    globalFeed: state.globalFeed,
    userFeed: state.userFeed,
    history: state.history
  }
}

export default connect(mapStateToProps)(FeedContainer);

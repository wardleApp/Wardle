import React from 'react';
import Feed from './Feed.jsx'
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import Paper from 'material-ui/Paper';
import Dialog from 'material-ui/Dialog';
import {connect} from 'react-redux';
import toggleHistory from '../actions/toggleHistory.js';

const FeedContainer = (props) => {

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
        <button className='feed-buttons history' onClick={() => this.props.onClick()} >
          EXPORT
        </button>
        <Dialog
          title="Payment history"
          modal={false}
          open={this.props.openHistory}
          onRequestClose={() => this.props.onClick()}
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
    history: state.history,
  }
}

const mapDispatchToProps = {
  onClick: toggleHistory
};
export default connect(mapStateToProps, mapDispatchToProps)(FeedContainer);

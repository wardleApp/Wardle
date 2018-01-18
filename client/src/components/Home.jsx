import React from 'react';
import Navbar from './Navbar.jsx';
import Payment from './Payment.jsx';
import FeedContainer from './FeedContainer.jsx';
import MiniProfile from './MiniProfile.jsx';
import Requests from './Requests.jsx';
import axios from 'axios';

class Home extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      history: []
    }
    this.getHistory(this.props.userInfo.userId);
  }

  getHistory(userId) {
    axios('/feed/all', {params: {userId: userId}})
      .then((results) =>{
        this.setState({history: results.data.items});
      });
  }

  extractView() {
    let search = this.props.location && this.props.location.search;
    return search && search.slice(search.indexOf('=') + 1);
  }

  render() {
    let orderedFeeds = [
      {
        displayLabel: 'mine',
        urlParam: 'mine',
        feedType: 'userFeed',
        data: this.props.userFeed
      },
      {
        displayLabel: 'public',
        urlParam: 'public',
        feedType: 'globalFeed',
        data: this.props.globalFeed
      }
    ];

    return (
      <div>
        <Navbar
          isLoggedIn={this.props.isLoggedIn}
          logUserOut={this.props.logUserOut}
        />
        <div className="home">
          <div className="home-leftColumn pay-feed-container">
            <Payment
              payerId={this.props.userInfo.userId}
              refreshUserData={this.props.refreshUserData}
              history={this.props.history}
              logUserOut={this.props.logUserOut}
              getHistory={this.getHistory.bind(this)} />
            <FeedContainer
              userId={this.props.userInfo.userId}
              base='/'
              feeds={orderedFeeds}
              loadMoreFeed={this.props.loadMoreFeed}
              view={this.extractView()}
              history={JSON.stringify(this.state.history)}
            />
          </div>
          <div className="home-rightColumn">
            <MiniProfile
              balance={this.props.balance}
              userInfo={this.props.userInfo}/>
            {this.state.history.filter(transaction => transaction.pending).map((transaction, index) =>
              <Requests key={index} request={transaction} userId={this.props.userInfo.userId} refreshUserData={this.props.refreshUserData} getHistory={this.getHistory.bind(this)}/>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Home;

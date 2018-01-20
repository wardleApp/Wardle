import React from 'react';
import FeedTransaction from './FeedTransaction.jsx'
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {connect} from 'react-redux';

const Feed = (props) => {
  let hasTransactions = props.transactions && props.transactions.items && props.transactions.items.length > 0;
  let showMoreButton = hasTransactions ? Boolean(props.transactions.nextPageTransactionId) : false;

  return (
    <div>
      <div>
        {!hasTransactions
          ? <div> No transactions available. </div>
          : <List>
              {props.transactions.items && props.transactions.items.map((transaction, i) => {
                let isLastItem = i === props.transactions.items.length - 1;
                return (
                  <FeedTransaction key={transaction.transactionId} isLastItem={isLastItem} transaction={transaction} />
                );
              })}
            </List>
        }
      </div>
      <div className='show-more'>
        {showMoreButton && <button className='btn' onClick={ () => props.loadMoreFeed(props.type, props.userId) } >Show More</button>}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.userInfo.userId
  }
};

export default connect(mapStateToProps)(Feed);

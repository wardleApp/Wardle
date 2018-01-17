
module.exports = {
  buildFeedObject: (items, limit) => {

    let itemCount = items ? items.length : 0
    let nextPageTransactionId = itemCount > limit ? items[itemCount - 1].transactionId : null;
    let itemArray = nextPageTransactionId ? items.slice(0, limit) : items;
    let resolvedCount = nextPageTransactionId ? itemCount - 1 : itemCount;

    let results = {
      count: resolvedCount,
      newestTransactionId: itemCount > 0 ? items[0].transactionId : null,
      nextPageTransactionId: nextPageTransactionId,
      items: itemArray
    }

    return results;
  }, 

  // middleware function to check for logged-in users
  sessionChecker: (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/');
    } else {
        next();
    }    
  }
}
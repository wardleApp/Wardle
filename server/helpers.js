//======= TOKEN GENERATOR =======//

const fruits = ["guava", "mango", "kiwi", "melon", "banana"];

const random = function(array) {
  let index = Math.floor(Math.random() * array.length)
  return array[index];
};

const hash = function(username, max) {
  let hash = 0;

    for (var i = 0; i < username.length; i++) {
      hash = (hash << 5) + hash + username.charCodeAt(i);
      hash = hash & hash; // Convert to 32bit integer
      hash = Math.abs(hash);
    }

    return hash % max;
};

const max = function(fruit) {
  let max = "";
  
  for (let a = 0; a < 12 - fruit.length; a++) {
    max += 9;
  }
  
  return max;
}

const generateToken = function(username) {
  let fruit = random(fruits);
  let token = fruit + hash(username, max(fruit) );

  return token;
};

//===============================//

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

  generateToken : generateToken
}
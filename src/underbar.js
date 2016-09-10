(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   */

  // Returns an array of the first n elements of an array. If n is undefined,
  // returns just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, returns just the
  // last element.
  _.last = function(array, n) {
    if (n === undefined) {
      return array[array.length - 1];
    } else if (n > array.length) {
      return array;
    } else {
      return array.slice(array.length - n, array.length);
    }
  };

  // Calls iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Runs the iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    var key, length, value;

    if (Array.isArray(collection)) {
      for (key = 0, length = collection.length; key < length; key++) {
        value = collection[key];
        iterator(value, key, collection);
      }
    } else {
      for (key in collection) {
        value = collection[key];
        iterator(value, key, collection);
      }
    }

  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Returns all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    var result = [];
    _.each(collection, function(item, index) {
      if (test(item, index)) result.push(item);
    });
    return result;
  };

  // Returns all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    return _.filter(collection, function(item, index) {
      return !test(item, index);
    });
  };

  // Produces a duplicate-free version of the array.
  _.uniq = function(array) {
    var result = [];
    _.each(array, function(item) {
      if (_.indexOf(result, item) === -1) result.push(item);
    });
    return result;
  };


  // Returns the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    var result = [];
    _.each(collection, function(item, index) {
      result.push(iterator(item, index));
    });
    return result;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  _.reduce = function(collection, iterator, accumulator) {
    var result, counter;

    if (accumulator === undefined) {
      result = collection[0];
      counter = 1;
    } else {
      result = accumulator;
      counter = 0;
    }

    while (counter < collection.length) {
      result = iterator(result, collection[counter]);
      counter++;
    }

    return result;
  };

  // Determines if the array or object contains a given value.
  _.contains = function(collection, target) {
    if (Array.isArray(collection)) {
      return _.reduce(collection, function(wasFound, item) {
        if (wasFound) {
          return true;
        }
        return item === target;
      }, false);
    } else {
      for (var key in collection) {
        if (collection[key] === target) return true;
      }
      return false;
    }
  };


  // Determines whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    return _.reduce(collection, function(result, item) {
      if (iterator === undefined) {
        return !item || !result ? false : true;
      } else {
        return !iterator(item) || !result ? false : true;
      }
    }, true);
  };

  // Determines whether any of the elements pass a truth test. If no iterator is
  // provided, provides a default one
  _.some = function(collection, iterator) {
    return _.reduce(collection, function(result, item) {
      if (_.every([item], iterator)) return true
      else return result;
    }, false);
  };


  /**
   * OBJECTS
   * =======
   *
   */

  // Extends a given object with all the properties of the passed in
  // object(s).
  _.extend = function(obj) {
    _.each(arguments, function(object) {
      _.each(object, function(value, key) {
        obj[key] = value;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(object) {
      _.each(object, function(value, key) {
        if (obj[key] === undefined) obj[key] = value;
      });
    });
    return obj;
  };


  /**
   * FUNCTIONS
   * =========
   */

  // Returns a function that can be called at most one time. Subsequent calls
  // return the previously returned value.
  _.once = function(func) {
    var alreadyCalled = false;
    var result;

    return function() {
      if (!alreadyCalled) {
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      return result;
    };
  };

  // Memorizes an expensive function's results by storing them. The function
  // takes only one argument and that it is a primitive.
  //
  // memoize does the same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize returns a function that, when called, checks if it has
  // already computed the result for the given argument and returns that value
  // instead if possible.
  _.memoize = function(func) {
    var result,
        args = {};

    return function() {
      if (args[arguments[0]] === undefined) {
        args[arguments[0]] = func.apply(this, arguments);
      }
      return args[arguments[0]];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    return setTimeout.apply(this, arguments);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  _.shuffle = function(array) {
    var arrayCopy = array.slice();
    var results = [];
    var randIndex;

    while (arrayCopy.length > 0) {
      randIndex = Math.floor(Math.random() * arrayCopy.length);
      results = results.concat(arrayCopy.splice(randIndex, 1));
    }

    return results;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   */

  // Calls the method named by functionOrKey on each value in the list.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, function(item) {
      if (typeof functionOrKey === 'string') {
        return item[functionOrKey]();
      } else {
        return functionOrKey.apply(item);
      }
    });
  };

  // Sorts the object's values by a criterion produced by an iterator.
  // If iterator is a string, sorts objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') sorts
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
  };
}());

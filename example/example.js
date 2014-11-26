if (Meteor.isClient) {

  // initial values
  Session.set('users', []);

  Template.infinite.rendered = function () {
    // Generate first batch of users
    getUsers();
  };

  Template.infinite.helpers({
    users: function () {
      return Session.get('users');
    },
    // optional animations (uses: mjn:fview-animate)
    enter : function() {
      return function(stateModifier, done) {
        stateModifier.setOpacity(0); // hide initially
        // fadeIn and invoke done() on completion
        stateModifier.setOpacity(1, { duration: 1500, curve: 'easeOut' }, done);
      };
    }
  });
}


// Callback Function
getUsers = function (count) {
  HTTP.get('http://api.randomuser.me/?results=20', function (error, result) {
    if (! error)
      Session.set('users', $.merge(Session.get('users'), result.data.results));

    // IMPORTANT: always call after you add any data to your scrollview (takes care of the async aspect)
    Session.set('isLoading', false);
  });
}


Meteor.sub
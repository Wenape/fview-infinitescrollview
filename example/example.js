if (Meteor.isClient) {

  Template.infinite.rendered = function () {
    // Generate first batch of users
    getUsers();
  };

  Template.infinite.helpers({
    users: function () {
      return Session.get('users');
    },
    enter : function() {
      return function(stateModifier, done) {
        stateModifier.setOpacity(0); // hide initially
        // fadeIn and invoke done() on completion
        stateModifier.setOpacity(1, { duration: 1500, curve: 'easeOut' }, done);
      };
    }
  });
}


// Functions
getUsers = function (count) {
  HTTP.get('http://api.randomuser.me/?results=' + 20, function (error, result) {
    if (! error) {
      Session.set('users', $.merge(Session.get('users'), result.data.results));

      // continue detecting content
      Session.set('isLoading', false);
    }
  });
}

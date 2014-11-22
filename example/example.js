if (Meteor.isClient) {

  // initial values
  Session.set('users', []);

  Template.infinite.rendered = function () {
    var fview = FView.from(this);

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
  //var ammount = Session.get('users').length + 20;
  HTTP.get('http://api.randomuser.me/?results=' + 20, function (error, result) {
    if (! error) {
      Session.set('users', $.merge(Session.get('users'), result.data.results));

      // give a momment for new surfaces to render
      Meteor.setTimeout(function() { Session.set('isLoading', false); }, 200);
    }
  });
}

var InfiniteScrollView;

FView.ready(function() {

  Session.set('isLoading', false);

  libDefine(myRequire, {}, module);
  InfiniteScrollView = module.exports;

  FView.registerView('InfiniteScrollview', InfiniteScrollView, {
    create: function(options) {
      var fview = this;
      var scrollview = new fview._view.constructor(options);

      // call when reach offset
      if (options.callback) {
        scrollview.on('infiniteScroll', function(data) {
          scrollview.infiniteScrollDisabled = true;
          
          if (Session.equals('isLoading', false) && options.callback) {
            Session.set('isLoading', true);

            // find object
            var fn = window[options.callback];

            // is object a function? Run it
            if (typeof fn === "function")
              fn.apply(null, [fview.sequence._sequence.length]);

            Tracker.autorun(function (trk) {
              if (Session.equals('isLoading', false)) {
                // give a momment for new surfaces to render
                Meteor.setTimeout(function() { scrollview.infiniteScrollDisabled = false; }, 200);
                trk.stop();
              }
            });
          };

        });  
      } else {
        FView.log.warn('You need to provide a callback function');
      }

      return scrollview;
    },
    famousCreatedPost: function() {
      this.pipeChildrenTo = this.parent.pipeChildrenTo ? [ this.view, this.parent.pipeChildrenTo[0] ] : [ this.view ];
    }
  });
});

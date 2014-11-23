# InfiniteScrollview - with added support for async data

NOTE: Famo.us > 0.3.0 is required for this plugin to function properly. 

This is [JonnyBGod's](https://github.com/JonnyBGod/famous-infinitescroll) Famo.us plugin implemented for Meteor to work with famous-views and mjn:famous or raix:famono (using > 0.3.0 libs).


DEMO: [Infinite Random Users](https://github.com/JonnyBGod/famous-infinitescroll)



Usage:

```handlebars
{{#InfiniteScrollview offset=500 callback='getUsers'}}
  {{#famousEach users}}
    ...
  {{/famousEach}}
{{/InfiniteScrollview}}
```

Properties:
  * offset: distance in px from the bottom of the viewport to execute the callback function
  * callback: global function defined by the user to be called when offset it reached

Callback (Example):

```js
getUsers = function (count) {
  HTTP.get('http://api.randomuser.me/?results=20', function (error, result) {
    if (! error) {
      Session.set('users', $.merge(Session.get('users'), result.data.results));

      // IMPORTANT: required for
      Session.set('isLoading', false);
    }
  });
}
```

count: provides the actual number of children within the scroller (may be usefull to take in account when calling an API)

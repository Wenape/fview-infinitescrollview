# famous-lagometer

This is [IjzerenHein's
KenBurnsContainer](https://github.com/IjzerenHein/famous-kenburnscontainer)
packaged for Meteor to work with famous-views and either raix:famono or mjn:famous.

Usage:

```handlebars
{{#KenBurnsContainer id="kbc"}}
  {{#ImageSurface content="image.png"}}{{/ImageSurface}}
{{#KenBurnsContainer}}
```

```js
var kenBurnsContainer = FView.byId("kbc").view;
// create sequence of pan & zoom animations
kenBurnsContainer.panAndZoom([0.0, 0.05], 1.9); // move to left-top & zoom-in
kenBurnsContainer.delay();                      // wait a bit (use default delay)
kenBurnsContainer.panAndZoom([0.5, 0.5], 3.0);  // move to center and zoom-in further
kenBurnsContainer.delay(3000);                  // wait a bit
kenBurnsContainer.panAndZoom(null, 1.0, 4000);  // zoom-out with custom duration
```

See the [full API reference](https://github.com/IjzerenHein/famous-kenburnscontainer/blob/master/docs/KenBurnsContainer.md).
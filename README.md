# posthtml-head-elements

This plugin allow you to keep HTML head elements - title, script, link, base and meta - in a separate JSON file:

```json
{
  "meta": [
    {
      "charset": "utf-8"
    },
    {
      "http-equiv": "X-UA-Compatible",
      "content": "IE=edge"
    },
    {
      "name": "description",
      "content": "A front-end template that helps you build fast, modern mobile web apps."
    },
    {
      "name": "viewport",
      "content": "width=device-width, initial-scale=1"
    }
  ],
  "title": "Web Starter Kit",
  "link": [
    {
      "rel": "manifest",
      "href": "manifest.json"
    },
    {
      "rel": "icon",
      "sizes": "192x192",
      "href": "images/touch/chrome-touch-icon-192x192.png"
    }
  ],
  "script": [
    {
      "src": "//cdn.polyfill.io/v1/polyfill.min.js"
    }
  ],
  "base": [
    {
      "href": "/"
    }
  ]
}
```

This is then configured like so:

```javascript
posthtml()
    .use(require('posthtml-head-elements')({headElements: 'path/to/json/file.json}))
    .process(input, {sync: false})
    .then(function(result) {
      console.log('result');
      console.dir(result);
      done();
    }).catch(function(error) {
    done(error);
  });
```

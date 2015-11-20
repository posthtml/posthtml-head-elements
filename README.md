# posthtml-head-elements [![Build Status][ci-img]][ci]
[![devDependency Status](https://david-dm.org/tcotton/portfolio/dev-status.svg?style=flat-square)](https://david-dm.org/tcotton/posthtml-head-elements#info=devDependencies)

[ci-img]: https://travis-ci.org/TCotton/posthtml-head-elements.svg
[ci]: https://travis-ci.org/TCotton/posthtml-head-elements

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

A custom tag is place in the document head, which signifies where the HTML head elements should be inserted during the build process:

```html

<!doctype html>
<html lang="en">
<head>

  <posthtml-head-elements></posthtml-head-elements>
  
  <!-- Add to homescreen for Chrome on Android -->
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="Web Starter Kit">

```


This is then configured like so:

```javascript
posthtml()
    .use(require('posthtml-head-elements')({
        headElements: 'path/to/json/file.json'
    }))
    .process(input, {
        sync: false
    })
    .then(function(result) {
        console.log('result');
        console.dir(result);
        done();
    }).catch(function(error) {
        done(error);
    });
```

Note that the HTML head elements are inserted into the document head in the order spatial order they are laid out - from top to bottom

It is possible to mix the head elements around but there will need to be a unique key which must have an underscore.

An example of a JSON file with multiple head elements is below.

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
    }
  ],
  "meta_1": [
    {
      "name": "mobile-web-app-capable",
      "content": "yes"
    },
    {
      "name": "application-name",
      "content": "Web Starter Kit"
    }
  ],
  "link_1": [
    {
      "rel": "icon",
      "sizes": "192x192",
      "href": "images/touch/chrome-touch-icon-192x192.png"
    }
  ],
  "meta_2": [
    {
      "name": "apple-mobile-web-app-capable",
      "content": "yes"
    },
    {
      "name": "apple-mobile-web-app-status-bar-style",
      "content": "black"
    },
    {
      "name": "apple-mobile-web-app-title",
      "content": "Web Starter Kit"
    }
  ],
  "link_2": [
    {
      "rel": "apple-touch-icon",
      "href": "images/touch/apple-touch-icon.png"
    }
  ],
  "meta_3": [
    {
      "name": "msapplication-TileImage",
      "content": "mages/touch/ms-touch-icon-144x144-precomposed.png"
    },
    {
      "name": "msapplication-TileColor",
      "content": "3372DF"
    },
    {
      "name": "theme-color",
      "content": "#3372DF"
    }
  ],
  "link_3": [
    {
      "rel": "stylesheet",
      "href": "styles/main.css"
    }
  ]
}
```
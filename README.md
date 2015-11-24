# posthtml-head-elements 

[![Build Status][ci-img]][ci]
[![devDependency Status](https://david-dm.org/tcotton/portfolio/dev-status.svg?style=flat-square)](https://david-dm.org/tcotton/posthtml-head-elements#info=devDependencies)
[![npm version](https://badge.fury.io/js/posthtml-head-elements.svg)](http://badge.fury.io/js/posthtml-head-elements)
[![Coverage Status](https://coveralls.io/repos/TCotton/posthtml-head-elements/badge.svg?branch=master&service=github)](https://coveralls.io/github/TCotton/posthtml-head-elements?branch=master)

[ci-img]: https://travis-ci.org/TCotton/posthtml-head-elements.svg
[ci]: https://travis-ci.org/TCotton/posthtml-head-elements

This plugin is intended to work with [PostHTML](https://github.com/posthtml/posthtml). It will allow you to keep HTML head elements - title, script, link, base and meta - in a separate JSON file:

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

A custom tag, which signifies where the HTML head elements should be inserted during the build process, needs to be placed in the document head:

```html

<!doctype html>
<html lang="en">
<head>

  <posthtml-head-elements></posthtml-head-elements>

  <!-- Add to homescreen for Chrome on Android -->
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="application-name" content="Web Starter Kit">

```

This is then configured like below if you are using [gulp-posthtml](https://www.npmjs.com/package/gulp-posthtml).
Please read the [PostHTML GitHub page](https://github.com/posthtml/posthtml) for plugin configuration guidelines.

```javascript

var posthtml = require('gulp-posthtml');
var gulp = require('gulp');
var jsonPath = '/data/posthtml-head-elements.json';

gulp.task('posthtml', function() {

  var plugins = [
    require('posthtml-head-elements')({headElements: jsonPath})
  ];

  return gulp.src('/app/index.html')
    .pipe(posthtml(plugins))
    .pipe(gulp.dest('/build/'));

});

```

Note that the HTML head elements are inserted into the document in the spatial order they are laid out - from top to bottom

It is possible to mix the head elements, but the JSON syntax requires a unique key. Therefore, if you are using more than one head element, place an underscore immediately afterwards.

An example of a JSON file with multiple head elements:

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

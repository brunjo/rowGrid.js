# rowGrid.js
**rowGrid.js is a small, lightweight (~900 bytes gzipped) jQuery plugin for placing images (or other items) in  straight rows.**

The grid is similar to grids on Google Image Search, flickr, shutterstock and Google+ images.

Features:

 * responsive
 * infinite scrolling
 * support for all modern browsers and IE >= 8

**A vanilla JavaScript version is available that doesn't require jQuery: https://github.com/brunjo/rowGrid**

[![Example Grid](http://brunjo.github.io/rowGrid.js/example.png)][2]

Do you like this project? Follow me on Twitter [@3runjo][1].

## How does it work?
All items must have the **same height** but the **width can be variable**. RowGrid.js justifies the items in straight rows so that the width of the rows equals the width of the container/parent element.
At first rowGrid.js adjusts the margin between the items. If this is not enough rowGrid.js scales down the items.

## Demos & Examples
Examples with explanation: http://brunjo.github.io/rowGrid.js/

Real world example: http://www.pexels.com/

## Installation
RowGrid.js requires jQuery 1.7 or above.
```HTML
<script src="path/to/jquery.min.js"></script>
<script src="path/to/jquery.row-grid.min.js"></script>
```

You can install it also with Bower or npm:
* Install with [Bower](http://bower.io): `bower install rowGrid.js`.
* Install with [npm](https://www.npmjs.com): `npm install rowgrid.js`.

## Usage
It is important that you either **declare the width and height as attributes** on the img tag or that you wait until the images are loaded before you start rowGrid.js.

HTML:
```HTML
<div class="container">
  <div class="item">
    <img src="path/to/image" width="320" height="200" />
  </div>
  <div class="item">
    <img src="path/to/image" width="290" height="200" />
  </div>
  ...
</div>
```
JS:
```JS
var options = {minMargin: 10, maxMargin: 35, itemSelector: ".item"};
$(".container").rowGrid(options);
```

### Endless Scrolling
JS:
```JS
// append new items
$(".container").append("<div class='item'><img src='http://placehold.it/310x200' /></div>");
// arrange appended items
$(".container").rowGrid("appended");
```

## Options
```JS
$(".container").rowGrid({
    itemSelector: ".item"
    minMargin: 10,
    maxMargin: 35,
    resize: true,
    lastRowClass: "last-row",
    firstItemClass: "first-item"
});
```
#### itemSelector (required)
* **value:** ```string``` (CSS Selector)

You have to set this option. The selector have to reference to all grid items.
#### minMargin
* **value:** ```number``` or ```null```
* **default value:** ```null```

This is the minimal horizontal margin between the items. The margin is only between the items not between the first/last item and the container.
#### maxMargin
* **value:** ```number``` or ```null```
* **default value:** ```null```

This is the maximal horizontal margin between the items.
#### resize
* **value:** ```boolean```
* **default value:** ```true```

If ```resize``` is set to true the layout updates on resize events. This is useful for responsive websites.
#### lastRowClass
* **value:** ```string```
* **default value:** ```last-row```

The first item in the last row gets this class.
#### firstItemClass
* **value:** ```string``` or ```null```
* **default value:** ```null```

The first item in every row gets this class.


  [1]: https://twitter.com/3runjo "@3runjo"
  [2]: http://brunjo.github.io/rowGrid.js/ "Demos"

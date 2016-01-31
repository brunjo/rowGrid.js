# rowGrid.js (no jQuery required)
> This version of rowGrid.js is not fully documented yet. Check out the master branch of this repository to see the documented [jQuery version](https://github.com/brunjo/rowGrid.js).

**rowGrid.js is a small, lightweight (~1kB gzipped) JavaScript plugin for placing images (or other items) in straight rows.**

The grid is similar to grids on Google Image Search, Flickr, Shutterstock and Google+ images.

Features:

 * responsive
 * infinite scrolling
 * support for all modern browsers and IE >= 9

[![Example Grid](http://brunjo.github.io/rowGrid.js/example.png)][2]

Do you like this project? Follow me on Twitter [@3runjo][1].

## How does it work?
All items must have the **same height** but the **width can be variable**. RowGrid.js justifies the items in straight rows so that the width of the rows equals the width of the container/parent element.
At first rowGrid.js adjusts the margin between the items. If this is not enough rowGrid.js scales down the items.

## Demos & Examples
Real world example: https://www.pexels.com/

## Installation
Just include row-grid.js
```HTML
<script src="path/to/row-grid.min.js"></script>
```

You can install it also with Bower or npm:
* Install with [Bower](http://bower.io): `bower install rowGrid`.
* Install with [npm](https://www.npmjs.com): `npm install rowgrid`.

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
var container = document.getElementsByClassName('container')[0];
rowGrid(container, {itemSelector: ".item", minMargin: 10, maxMargin: 25, firstItemClass: "first-item", lastRowClass: 'last-row', resize: true});
```

### Relayout
You can relayout the complete grid with `rowGrid(container);`. If you appended items to the grid you can call `rowGrid(container, 'appended');` to arrange just the new items in the grid.

**TODO add more documentation**


  [1]: https://twitter.com/3runjo "@3runjo"
  [2]: http://brunjo.github.io/rowGrid.js/ "Demos"

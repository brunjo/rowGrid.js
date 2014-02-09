# rowGrid.js
**rowGrid.js is a small, lightweight (1.24kb minfied) jQuery plugin for arranging items in rows.**

The grid is similar to the result page of the Google Image Search or the Google+ images.

## Installation
```
<script src="path/to/jquery.min.js" >
<script src="path/to/jquery.row-grid.min.js" >
```
## Usage
HTML:
```
<div class="container">
  <div class="item">
    <img src="http://placehold.it/340x200" />
  </div>
  <div class="item">
    <img src="http://placehold.it/320x200" />
  </div>
  ...
</div>
```
JS:
```
var options = {minMargin: 10, maxMargin: 35, itemSelector: ".item"};
$(".container").rowGrid(options);
```

### Endless Scroll
JS:
```
// append new items
$(".container").append("<div class='item'><img src='http://placehold.it/310x200' />");
// arrange appended items
$(".container").rowGrid("appended");
```

### Options
#### itemSelector (required)
#### minMargin
#### maxMargin
#### resize
#### lastRowClass
#### firstItemClass

# rowGrid.js
**roWgrid.js is a small, lightweight jQuery plugin for arranging items in rows.**

The grid is similar to the result page of the Google Image Search or the Google+ images.

## Installation
```
<script src="path/to/jquery.min.js" >
<script src="path/to/jquery.row-grid.min.js" >
```
## Usage
HTML:
```
<div class="items">
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
$(".items").rowGrid(options);
```

### Options
#### itemSelector (required)
#### minMargin
#### maxMargin
#### resize
#### lastRowClass
#### firstItemClass

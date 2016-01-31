var rowGrid = function(container, options) {
  if (container === null || container === undefined) {
    return;
  }

  if (options === 'appended') {
    options = JSON.parse(container.getAttribute('data-row-grid'));
    var lastRow = container.getElementsByClassName(options.lastRowClass)[0];
    var items = nextAll(lastRow);
    layout(container, options, items);
  } else {
    if (!options) {
      options = JSON.parse(container.getAttribute('data-row-grid'));
    }

    layout(container, options);

    container.setAttribute('data-row-grid', JSON.stringify(options));

    if (options.resize) {
      window.addEventListener('resize', function(event) {
        layout(container, options);
      });
    }
  }

  /* Get elem and all following siblings of elem */
  function nextAll(elem) {
    var matched = [elem];

    while ((elem = elem['nextSibling']) && elem.nodeType !== 9) {
      if (elem.nodeType === 1) {
        matched.push(elem);
      }
    }
    return matched;
  }

  function layout(container, options, items) {
    var rowWidth = 0,
      rowElems = [],
      items = Array.prototype.slice.call(items || container.querySelectorAll(options.itemSelector)),
      itemsSize = items.length;

    // read
    var containerStyle = getComputedStyle(container);
    var containerWidth = Math.floor(container.getBoundingClientRect().width) - parseFloat(containerStyle.getPropertyValue('padding-left')) - parseFloat(containerStyle.getPropertyValue('padding-right'));
    var itemAttrs = [];
    var theImage, w, h;
    for (var i = 0; i < itemsSize; ++i) {
      theImage = items[i].getElementsByTagName('img')[0];
      if (!theImage) {
        items.splice(i, 1);
        --i;
        --itemsSize;
        continue;
      }
      // get width and height via attribute or js value
      if (!(w = parseInt(theImage.getAttribute('width')))) {
        theImage.setAttribute('width', w = theImage.offsetWidth);
      }
      if (!(h = parseInt(theImage.getAttribute('height')))) {
        theImage.setAttribute('height', h = theImage.offsetHeight);
      }

      itemAttrs[i] = {
        width: w,
        height: h
      };
    }
    itemsSize = items.length;

    // write
    for (var index = 0; index < itemsSize; ++index) {
      if (items[index].classList) {
        items[index].classList.remove(options.firstItemClass);
        items[index].classList.remove(options.lastRowClass);
      } else {
        // IE <10
        items[index].className = items[index].className.replace(new RegExp('(^|\\b)' + options.firstItemClass + '|' + options.lastRowClass + '(\\b|$)', 'gi'), ' ');
      }

      // add element to row
      rowWidth += itemAttrs[index].width;
      rowElems.push(items[index]);

      // check if it is the last element
      if (index === itemsSize - 1) {
        for (var rowElemIndex = 0; rowElemIndex < rowElems.length; rowElemIndex++) {
          // if first element in row
          if (rowElemIndex === 0) {
            rowElems[rowElemIndex].className += ' ' + options.lastRowClass;
          }
          rowElems[rowElemIndex].style.cssText =
            'width: ' + itemAttrs[index + parseInt(rowElemIndex) - rowElems.length + 1].width + 'px;' +
            'height: ' + itemAttrs[index + parseInt(rowElemIndex) - rowElems.length + 1].height + 'px;' +
            'margin-right:' + ((rowElemIndex < rowElems.length - 1) ? options.minMargin + 'px' : 0);
        }
      }

      // check whether width of row is too high
      if (rowWidth + options.maxMargin * (rowElems.length - 1) > containerWidth) {
        var diff = rowWidth + options.maxMargin * (rowElems.length - 1) - containerWidth;
        var nrOfElems = rowElems.length;

        // change margin
        var maxSave = (options.maxMargin - options.minMargin) * (nrOfElems - 1);
        if (maxSave < diff) {
          var rowMargin = options.minMargin;
          diff -= (options.maxMargin - options.minMargin) * (nrOfElems - 1);
        } else {
          var rowMargin = options.maxMargin - diff / (nrOfElems - 1);
          diff = 0;
        }

        var rowElem,
          newHeight = null,
          widthDiff = 0;
        for (var rowElemIndex = 0; rowElemIndex < rowElems.length; rowElemIndex++) {
          rowElem = rowElems[rowElemIndex];

          var rowElemWidth = itemAttrs[index + parseInt(rowElemIndex) - rowElems.length + 1].width;
          var newWidth = rowElemWidth - (rowElemWidth / rowWidth) * diff;
          newHeight = newHeight || Math.round(itemAttrs[index + parseInt(rowElemIndex) - rowElems.length + 1].height * (newWidth / rowElemWidth));

          if (widthDiff + 1 - newWidth % 1 >= 0.5) {
            widthDiff -= newWidth % 1;
            newWidth = Math.floor(newWidth);
          } else {
            widthDiff += 1 - newWidth % 1;
            newWidth = Math.ceil(newWidth);
          }
          rowElem.style.cssText =
            'width: ' + newWidth + 'px;' +
            'height: ' + newHeight + 'px;' +
            'margin-right: ' + ((rowElemIndex < rowElems.length - 1) ? rowMargin : 0) + 'px';
          if (rowElemIndex === 0) {
            rowElem.className += ' ' + options.firstItemClass;
          }
        }
        rowElems = [],
          rowWidth = 0;
      }
    }
  }
};
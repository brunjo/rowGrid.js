(function($){
  $.fn.rowGrid = function( options ) {
    if(options === 'appended') {
      options = this.data('grid-options');
      var $lastRow = this.children('.' + options.lastRowClass);
      var items = $lastRow.nextAll().add($lastRow);
      layout(this, options, items);
    } else {
      options = $.extend( {}, $.fn.rowGrid.defaults, options );
      var $container = this;
      $container.data('grid-options', options);
      layout($container, options);
      
      if(options.resize) {
        $(window).on('resize', {container: $container}, function(event) {
          layout(event.data.container, options);
        });
      }
    }
    return this;
  };
  
  $.fn.rowGrid.defaults = {
    minMargin: null,
    maxMargin: null,
    resize: true,
    lastRowClass: 'last-row',
    firstItemClass: null
  };
 
  function layout($container, options, items) {
    var rowWidth = 0,
        rowElems = [],
        items = items || $container.children(options.itemSelector),
        itemsSize = items.length - 1;

    $container.children('.' + options.lastRowClass).removeClass(options.lastRowClass);

    items
      .removeAttr('style')
      .removeClass(options.firstItemClass);

    // read
    var containerWidth = $container.width() - ($container[0].offsetWidth - $container[0].clientWidth); // width minus scrollbar width
    var itemAttrs = [];
    items.each(function(index, elem) {
      elem = $(elem);
      itemAttrs[index] = {
        outerWidth: elem.outerWidth(),
        height: elem.height()
      };
    });

    // write
    items.each(function(index, elem) {
      elem = $(elem);
      rowWidth += itemAttrs[index].outerWidth;
      rowElems.push(elem);
      
      // check if it is the last element
      if(index === itemsSize) {
        for(var rowElemIndex = 0; rowElemIndex<rowElems.length; rowElemIndex++) {
          // if first element in row 
          if(rowElemIndex === 0) {
            rowElems[rowElemIndex].addClass(options.lastRowClass);
          }
          rowElems[rowElemIndex].css('margin-right', (rowElemIndex < rowElems.length - 1)?options.minMargin : 0);
        }
      }      
      
      // check whether width of row is too high
      if(rowWidth + options.maxMargin * (rowElems.length - 1) > containerWidth) {
        var diff = rowWidth + options.maxMargin * (rowElems.length - 1) - containerWidth;
        var nrOfElems = rowElems.length;
        // change margin
        var maxSave = (options.maxMargin - options.minMargin) * (nrOfElems - 1);
        if(maxSave < diff) {
          var rowMargin = options.minMargin;
          diff -= (options.maxMargin - options.minMargin) * (nrOfElems - 1);
        } else {
          var rowMargin = options.maxMargin - diff / (nrOfElems - 1);
          diff = 0;
        }
        var $rowElem;
        for(var rowElemIndex = 0; rowElemIndex<rowElems.length; rowElemIndex++) {
          $rowElem = rowElems[rowElemIndex];
          var rowElemWidth = itemAttrs[index+parseInt(rowElemIndex)-rowElems.length+1].outerWidth;
          var newWidth = rowElemWidth - (rowElemWidth / rowWidth) * diff;
          $rowElem
            .css('width', Math.floor(newWidth))
            .css('height', Math.floor(itemAttrs[index+parseInt(rowElemIndex)-rowElems.length+1].height * (newWidth / rowElemWidth)))
            .css('margin-right', (rowElemIndex < rowElems.length - 1)?rowMargin : 0);
          if(rowElemIndex === 0) {
            $rowElem.addClass(options.firstItemClass);
          }
        }
        rowElems = [];
        rowWidth = 0;
      }
    });
  }
})(jQuery);
(function($){
  $.fn.rowGrid = function( options ) {
    if(options === "appended") {
      options = this.data("grid-options");
      var $lastRow = this.children("." + options["lastRowClass"]);
      var $items = $lastRow.nextAll().add($lastRow);
      $lastRow.removeClass("last-row");
      layout(this, options, $items);
    } else {
      options = $.extend( {}, $.fn.rowGrid.defaults, options );
      var $container = this;
      $container.data("grid-options", options);
      layout($container, options);
      
      if(options["resize"]) {
        $(window).on("resize", function() {
          layout($container, options);
        });
      }
    }
    return this;
  };
  
  $.fn.rowGrid.defaults = {
    minMargin: 0,
    maxMargin: 0,
    resize: true,
    lastRowClass: "last-row",
    firstItemClass: null
  };
 
  function layout($container, options, $items) {
    var containerWidth = $container.outerWidth(),
        rowWidth = 0,
        rowElems = [],
        $items = $items || $(options["itemSelector"]),
        itemsSize = $items.length - 1;

    $items.each(function(index, elem) {
      $(elem)
        .removeAttr("style")
        .removeClass(options["firstItemClass"]);
      rowWidth += $(elem).outerWidth();
      rowElems.push(elem);
      
      // check if it is the last element
      if(index === itemsSize) {
        $(rowElems).each(function(rowElemIndex, elem) {
          // if first element in row 
          if(rowElemIndex === 0) {
            $(elem).addClass(options["lastRowClass"]);
          }
          $(elem).css("margin-right", (rowElemIndex < rowElems.length - 1)?options["maxMargin"] : 0);
        });
      }      
      
      // check whether width of row is too high
      if(rowWidth + options["maxMargin"] * (rowElems.length - 1) > containerWidth) {
        var diff = rowWidth + options["maxMargin"] * (rowElems.length - 1) - containerWidth;
        nrOfElems = rowElems.length;
        // change margin
        var maxSave = (options["maxMargin"] - options["minMargin"]) * (nrOfElems - 1)
        if(maxSave < diff) {
          var rowMargin = options["minMargin"];
          diff -= (options["maxMargin"] - options["minMargin"]) * (nrOfElems - 1);
        } else {
          var rowMargin = options["maxMargin"] - diff / (nrOfElems - 1);
          diff = 0;
        }
        for (var rowElemIndex in rowElems) {
          var $rowElem = $(rowElems[rowElemIndex]);
          if(rowElemIndex == 0) {
            $rowElem.addClass(options["firstItemClass"]);
          }
          var rowElemWidth = $rowElem.outerWidth();
          var newWidth = rowElemWidth - (rowElemWidth / rowWidth) * diff;
          $rowElem
            .css("width", newWidth)
            .css("height", $rowElem.height() * (newWidth / rowElemWidth))
            .css("margin-right", (rowElemIndex < rowElems.length - 1)?rowMargin : 0);
        }
        rowElems = [];
        rowWidth = 0;
      }
    });
  };
})(jQuery);

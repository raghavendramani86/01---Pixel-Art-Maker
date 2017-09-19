// variable declarations
  const text = $("input[type='text']");
  const color = $("input[type='color']")
  const radio = $("input[type='radio']")
  const initialColor = color[0].defaultValue;
  var value = activeRadio();

// function declarations
    // function to build array from rows and columns
    function inputArray() {
      const array =[];
      console.log('Building array from rows and columns');
      text.each(function(index) {
        // console.log($(this).val());
        array[index] = $(this).val();
      });
      //check device pixel resolution
      array[1]=checkResolution(array[0],array[1]);
      $("input[type='text']")[1].value = array[1];
      console.log('--here is your array: ' + array);
      console.log('--initial color is: ' + initialColor);
      return array;
    }

    // function to make grid
    function makeGrid(grid) {
      if (grid) {
        // if grid exists, re-initialize grid before proceeding
        deleteGrid();
        console.log('Grid reset to default');
      }
      // internally calls function to build array
      grid = inputArray();
      console.log('--using array to build grid');
      // Add num rows
      for (var i = 1; i <= grid[0]; i++) {
        console.log('--Row: ' +i);
        $('.grid').prepend("<div class='gridrow'>");
      }
      // Add num columns to each row
      for (var i = 1; i <=grid[1]; i++) {
        $('.gridrow').append("<div>");
      }
      console.log('--'+grid[0]+'x'+grid[1]+' Grid: is ready');
      $('.gridrow').children().each(function() {
        $(this).addClass('gridcol').css('background', initialColor);

      });
      return event;
    }

    // function to color pixels on grid
    function colorGrid() {
      var active = activeRadio();
      if (event.type===active){
        $(this).css('background-color', color.val());
      }
    }

    // function to reset grid
    function resetGridColors() {
      $('.gridcol').css('background', initialColor);
    }

    // function to delete grid
    function deleteGrid() {
      $('.gridrow').remove();
      console.clear('');
    };

    // function to adjust grid based on screen resolution
    function checkResolution(row,col){
      var a = $('.grid');
      if ((col*1*20+5)>Math.round(a[0].offsetWidth)) {
        alert('Input Grid size is too large for the device.\n'+
        'Dimensions adjusted to accomodate current resolution.');
        col = Math.round(a[0].offsetWidth/20)-1;
      }
      return col;
    }

    // function to enable draw selection
    function drawSelector() {
      var currentButton = this;
      value = currentButton.name;
      // reset other radio buttons
      radio.each(function() {
        if (currentButton!=this) {
          if(this.checked) {
            this.checked = false;
          }
        }
      });
    }

    // function to determine active radio button
    function activeRadio() {
      var active = '';
      radio.each(function() {
        if (this.checked===true) {
          active = this.name;
        }
      })
      return active;
    }


// initialization - first load
  makeGrid();

// execution - user interaction
  // make grid
  $('body').on('click','.make',makeGrid);

  // Color selected columns of grid
  $('body').on('click', '.gridcol' , colorGrid);
  $('body').on('mouseover', '.gridcol' , colorGrid);

  // reset grid
  $('body').on('click', '.reset' , resetGridColors);

  // delete grid
  $('body').on('click', '.remove' , deleteGrid);

  // Draw selector
  $('body').on('click', '.radio', drawSelector);

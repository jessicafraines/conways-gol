document.addEventListener('DOMContentLoaded', function(){
  var matrix = [[0, 1, 0], [0, 1, 1], [0, 1, 1]];
  generateGrid(matrix);

 function generateGrid(matrix){
    var $table = document.querySelector('#grid');
    $table.innerHTML = '';

    matrix.forEach(function(row){ // first time, row => [0, 0, 0]
      var $tr = document.createElement('tr');
      row.forEach(function(cell){ // first time, cell => 0
        var $td = createTableCell(cell);
        $td.textContent = cell;
        $tr.appendChild($td);
      });
      $table.appendChild($tr);
    });
  }

  function createTableCell(value){
    var $td = document.createElement('td');
    if(value === 1){
      $td.classList.add('alive');
    } else {
      $td.classList.add('dead');
    }
    return $td;
  }

  function livingNeighborCount(x, y){
    var neighborsArray = neighbors(x, y);
    var count = 0;
    neighborsArray.forEach(function(coord){
      count += matrix[ coord[0] ][ coord[1] ];
    });
    return count;
  }

  function neighbors(x, y){
    var maxX = matrix.length;
    var maxY = matrix[0].length;

    var array = [];
    // topLeft
    if ( x-1 >= 0 && x-1 < maxX && y-1 >= 0 && y-1 < maxY) {
      array.push([x-1, y-1]);
    }
    // top
    if ( x-1 >= 0 && x-1 < maxX && y >= 0 && y < maxY) {
      array.push([x-1, y]); 
    }
    //topRight
    if ( x-1 >= 0 && x-1 < maxX && y+1 >= 0 && y+1 < maxY) {
      array.push([x-1, y+1]);
    }
    //left
    if ( x >= 0 && x < maxX && y-1 >= 0 && y-1 < maxY) {
      array.push([x, y-1]);
    }
    //right
    if ( x >= 0 && x < maxX && y+1 >= 0 && y+1 < maxY) {
      array.push([x, y+1]);
    }
    //bottomLeft
    if ( x+1 >= 0 && x+1 < maxX && y-1 >= 0 && y-1 < maxY) {
      array.push([x+1, y-1]);
    }
    //bottom
    if ( x+1 >= 0 && x+1 < maxX && y >= 0 && y < maxY) {
      array.push([x+1, y]);
    }
    //bottomRight
    if ( x+1 >= 0 && x+1 < maxX && y+1 >= 0 && y+1 < maxY) {
      array.push([x+1, y+1]);
    }
   // console.log('array', array);
    return array;
  }

  function calculateNextState(currentState){
    var nextState = [];
    currentState.forEach(function(currentRow, x){
      var nextRow = [];
      currentRow.forEach(function(currentCell, y){
        var livingCount = livingNeighborCount(x, y);
        var nextCellState;
        if(livingCount < 2){
          nextCellState = 0;
        }else if(livingCount > 3){
          nextCellState = 0;
        }else if(livingCount === 3){
          nextCellState = 1;
        }else{
          nextCellState = currentCell;
        }

        // Rule 1. Less than 2 neighbors = die of loneliness if () { nextcellstate = 0 }
        // Rule 3. More than 3 neighbors = death by overpopulation else if  if () { nextcellstate = 0 }

        // Rule 4. Exactly 3 neighbors = birth    else if  if () { nextcellstate = 1 }


        // Rule 2. Things stay the same unless they change (inertia) else  if () { nextcellstate = currentCell }

             nextRow.push(nextCellState);
      });
      nextState.push(nextRow);
    });
    return nextState;
  }

  document.querySelector("#tick").addEventListener('click', function(){
    // Tick button has been pressed
    matrix = calculateNextState(matrix);
    generateGrid(matrix);
  });
});

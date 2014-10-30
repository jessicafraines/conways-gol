function matrixCreator(tr, td){
  var matrix = [];
  for(var i = 0; i < tr; i++){
    matrix[i] = [];
    for(var j = 0; j < td; j++){
      matrix[i][j] = Math.round(Math.random())
    }
  }
  return matrix;
}

document.addEventListener('DOMContentLoaded', function(){
  var matrix = matrixCreator(30,30);
  generateGrid(matrix);

  function generateGrid(matrix){
    var $table = document.getElementById('table');
    $table.innerHTML = '';
    matrix.forEach(function(tr){
      var $tr = document.createElement('tr');
      tr.forEach(function(td){
        var $td = createTableCell(td);
        $tr.appendChild($td);
      });
      $table.appendChild($tr);
    });
  }
  function createTableCell(item){
    var $td = document.createElement('td');
    if(item === 1){
      $td.classList.add('alive');
    }else{
      $td.classList.add('dead');
    }
    return $td;
  }

  function livingNeighborCount(x, y){
    var neighborsArray = neighbors(x, y);
    var count = 0;
    neighborsArray.forEach(function(coord){
      count += matrix[coord[0]] [coord[1]];
    });
    return count;
  }
  function neighbors(x, y){
    var maxX = matrix.length;
    var maxY = matrix[0].length;

    var neighbors = [];
    //top left
    if(x-1 >= 0 && x-1 < maxX && y-1 >= 0 && y-1 < maxY){
      neighbors.push([x-1, y-1]);
    }
    //top 
    if(x-1 >= 0 && x-1 < maxX && y >= 0 && y < maxY){
      neighbors.push([x-1, y]);
    }
    //top right
    if(x-1 >= 0 && x-1 < maxX && y+1 >= 0 && y+1 < maxY){
      neighbors.push([x-1, y+1]);
    }
    //left
    if(x >= 0 && x < maxX && y-1 >= 0 && y-1 < maxY){
      neighbors.push([x, y-1]);
    }
    //right
    if(x >= 0 && x < maxX && y+1 >= 0 && y+1 < maxY){
      neighbors.push([x, y+1]);
    }
    //bottom left
    if(x+1 >= 0 && x+1 < maxX && y-1 >= 0 && y-1 < maxY){
      neighbors.push([x+1, y-1]);
    }
    //bottom 
    if(x+1 >= 0 && x+1 < maxX && y >= 0 && y < maxY){
      neighbors.push([x+1, y]);
    }
    //bottom right
    if(x+1 >= 0 && x+1 < maxX && y+1 >= 0 && y+1 < maxY){
      neighbors.push([x+1, y+1]);
    }
    return neighbors;
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
        nextRow.push(nextCellState);
      });
      nextState.push(nextRow);
    });
    return nextState;
  }
  
  document.querySelector('#tick').addEventListener('click', function(){
    matrix = calculateNextState(matrix);
    generateGrid(matrix);
  });
}); //closing for DOMContentLoaded

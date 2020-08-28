/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting



// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

// O(n^2)
window.findNRooksSolution = function(n) {

  var solution = new Board({n: n});

  var matrix = solution.rows();

  var placingIndex = 0;

  for (var row = 0; row < n; row++) {
    matrix[row][placingIndex] = 1;
    placingIndex++;
  }

  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

window.countNRooksSolutions = function(n) {
  // //to refactor consider an array of colum and row indexes that you can keep track of the ones we've visited. .contains or .includes
  if (n === 0) {
    return 1;
  }
  var solutionCount = 0;

  var newBoard = new Board({n: n});
  var matrix = newBoard.rows();

  var findNthRooks = function(rowIndex) {
    for (var col = 0; col < n; col++) {
      matrix[rowIndex][col] = 1;
      if (rowIndex === n - 1 && (!(newBoard.hasRowConflictAt(rowIndex)) && !(newBoard.hasColConflictAt(col)))) {
        // console.log(matrix);
        solutionCount++;
        matrix[rowIndex][col] = 0;
        return;
      }

      if (!(newBoard.hasRowConflictAt(rowIndex)) && !(newBoard.hasColConflictAt(col))) {
        findNthRooks(rowIndex + 1);
      }
      matrix[rowIndex][col] = 0;
    }

  };
  findNthRooks(0);

  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other



window.findNQueensSolution = function(n) {
  var newBoard = new Board({n: n});
  var solution = newBoard.rows();
  // debugger;
  var solutionFound = false;
  var recurse = function(row) {

    for (var col = 0; col < n; col++) {
      solution[row][col] = 1;

      var validBoard = !(newBoard.hasRowConflictAt(row)) && !(newBoard.hasColConflictAt(col)) &&
      !(newBoard.hasMajorDiagonalConflictAt(col - row)) && !(newBoard.hasMinorDiagonalConflictAt(col + row));

      if (row === n - 1 && validBoard) {
        solutionFound = true;
        return solution;
      }
      if (validBoard) {
        recurse(row + 1);
      }

      if (solutionFound) {
        return solution;
      }

      solution[row][col] = 0;
    }
  };
  recurse(0);

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other

// hasRowConflictAt
// hasColConflictAt
// hasMajorDiagonalConflictAt
// hasMinorDiagonalConflictAt

window.countNQueensSolutions = function(n) {

  if (n === 0) {
    return 1;
  }

  var solutionCount = 0;

  var newBoard = new Board({n: n});
  var matrix = newBoard.rows();

  var recurse = function(row) {
    for (var col = 0; col < n; col++) {
      matrix[row][col] = 1;

      var validBoard = !(newBoard.hasRowConflictAt(row)) && !(newBoard.hasColConflictAt(col)) &&
      !(newBoard.hasMajorDiagonalConflictAt(col - row)) && !(newBoard.hasMinorDiagonalConflictAt(col + row));

      if (row === n - 1 && validBoard) {
        solutionCount++;
        matrix[row][col] = 0;
        return;
      }

      if (validBoard) {
        recurse(row + 1);
      }

      matrix[row][col] = 0;
    }
  };
  recurse(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

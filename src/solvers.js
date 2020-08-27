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
window.findNRooksSolution = function(n) {

  var solution = new Board({n: n});

  var matrix = solution.rows();

  var placingIndex = 0;

  for (var row = 0; row < matrix.length; row++) {
    matrix[row][placingIndex] = 1;
    placingIndex++;
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return matrix;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //to refactor consider an array of colum and row indexes that you can keep track of the ones we've visited. .contains or .includes

  var solutionCount = 0;
  var storage = {};

  for (var i = 0; i < Math.ceil(n / 2); i++) {
    for (var j = 0; j < n; j++) {
      // create a matrix
      var newBoard = new Board({n: n});
      // create a new board
      var matrix = newBoard.rows();
      matrix[i][j] = 1;

      // number of set pieces
      var setPieces = 0;
      // iterate over rows
      for (var row = 0; row < matrix.length; row++) {
        // iterate over columns
        for (var col = 0; col < matrix.length; col++) {
          // place a 1 here
          matrix[row][col] = 1;
          setPieces++;

          // if row or conflict are true, can skip current (rest of) row or column

          // if current position passes both rows and cols conflict checks
          if (newBoard.hasRowConflictAt(row) || newBoard.hasColConflictAt(col)) {
            matrix[row][col] = 0;
            setPieces--;
          }
        }
      }

      // console.log('set pieces are:', setPieces);
      if (setPieces === n) {
        // console.log('matrix before adding a copy to storage', matrix);
        var storageKey = JSON.stringify(matrix);
        // console.log('array key', storageKey);
        if (storage[storageKey] === undefined) {
          solutionCount++;
          storage[storageKey] = true;
        }
      }
    }
    console.log('set pieces are:', setPieces);
    if (setPieces === n) {
      console.log('matrix before adding a copy to storage', matrix);
      var storageKey = JSON.stringify(matrix);
      console.log('array key', storageKey);
      if (storage[storageKey] === undefined) {
        solutionCount++;
        storage[storageKey] = true;
      }
    }
  }

  for (var i = 0; i < Math.ceil(n / 2); i++) {
    for (var j = 0; j < n; j++) {
      // debugger;
      // create a matrix
      var newBoard = new Board({n: n});
      // create a new board
      var matrix = newBoard.rows();
      matrix[n - 1][j] = 1;

      // number of set pieces
      var setPieces = 0;
      // iterate over rows
      for (var row = 0; row < matrix.length; row++) {
        // iterate over columns
        for (var col = n - 1; col >= 0; col--) {
          // place a 1 here
          matrix[row][col] = 1;
          setPieces++;

          // if row or conflict are true, can skip current (rest of) row or column

          // if current position passes both rows and cols conflict checks
          if (newBoard.hasRowConflictAt(row) || newBoard.hasColConflictAt(col)) {
            matrix[row][col] = 0;
            setPieces--;
          }
        }
      }

      console.log('set pieces are:', setPieces);
      if (setPieces === n) {
        console.log('matrix before adding a copy to storage', matrix);
        var storageKey = JSON.stringify(matrix);
        console.log('array key', storageKey);
        if (storage[storageKey] === undefined) {
          solutionCount++;
          storage[storageKey] = true;
        }
      }

  }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};




// backup:
// window.findNRooksSolution = function(n) {

//   var solution = new Board({n: n});

//   var matrix = solution.rows();

//   var placingIndex = 0;

//   for (var row = 0; row < matrix.length; row++) {
//     matrix[row][placingIndex] = 1;
//     placingIndex++;
//   }

//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
//   return matrix;
// };

// // return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// window.countNRooksSolutions = function(n) {
//   //to refactor consider an array of colum and row indexes that you can keep track of the ones we've visited. .contains or .includes

//   var solutionCount = 0;
//   var storage = {};

//   for (var i = 0; i < n; i++) {
//     for (var j = 0; j < n; j++) {
//       // create a matrix
//       var newBoard = new Board({n: n});
//       // create a new board
//       var matrix = newBoard.rows();
//       matrix[i][j] = 1;

//       // number of set pieces
//       var setPieces = 0;
//       // iterate over rows
//       for (var row = 0; row < matrix.length; row++) {
//         // iterate over columns
//         for (var col = 0; col < matrix.length; col++) {
//           // place a 1 here
//           matrix[row][col] = 1;
//           setPieces++;

//           // if row or conflict are true, can skip current (rest of) row or column

//           // if current position passes both rows and cols conflict checks
//           if (newBoard.hasRowConflictAt(row) || newBoard.hasColConflictAt(col)) {
//             matrix[row][col] = 0;
//             setPieces--;
//           }
//         }
//       }

//       console.log('set pieces are:', setPieces);
//       if (setPieces === n) {
//         console.log('matrix before adding a copy to storage', matrix);
//         var storageKey = JSON.stringify(matrix);
//         console.log('array key', storageKey);
//         if (storage[storageKey] === undefined) {
//           solutionCount++;
//           storage[storageKey] = true;
//         }
//       }
//     }
//   }

//   console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
//   return solutionCount;
// };
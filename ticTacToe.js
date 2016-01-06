(function() {
  var app = angular.module('ticTac', []);
  
  app.controller('gameController', ['$scope', function($scope) {
    var fields = {
      empty: '""',
      cross: "x",
      naught: "o"
    };
    
    $scope.currentFieldType = fields.cross;
    
    $scope.computer = false;

    $scope.generateBoard = function() {
      var board = [];
      for (var i = 0; i < 3; i++) {
        var row = [];
        for (var x = 0; x < 3; x++) {
          row.push({value: ''});
        }
        board.push(row);
      }
      return board;
    }
    
    $scope.board = $scope.generateBoard();

    $scope.setPlayer = function(fieldType) {
      $scope.currentFieldType = fieldType;
    }

    $scope.computerMove = function() {
		var row; 
		var done;     
      for (var i = 0; i < 3; i++) {
        row = $scope.board[i];
        for (var x = 0; x < 3; x++) {
          if (row[x].value === '') {
            row[x].value = $scope.currentFieldType;
            $scope.checkForWinner($scope.currentFieldType, "Sorry - you have lost");
            $scope.togglePlayer();
            done = true;
            break;
          }
        }
		  if (done) {      
        break;
        }
      }
    }
    
    $scope.playingWithComputer = function () {
      $scope.computer = true;
    }

    $scope.togglePlayer = function() {
      if ($scope.currentFieldType === 'o') {
        $scope.currentFieldType = 'x';
      } else {
        $scope.currentFieldType = 'o';
      }
    }

    $scope.checkForWinner = function(field, message) {
      var b = $scope.board;
      console.log(b);
      if ((b[0][0].value === field && b[0][1].value === field && b[0][2].value === field)|| 
          (b[1][0].value === field && b[1][1].value === field && b[1][2].value === field) || 
          (b[2][0].value === field && b[2][1].value === field && b[2][2].value === field) || 
          (b[0][0].value === field && b[1][0].value === field && b[2][0].value === field) || 
          (b[0][1].value === field && b[1][1].value === field && b[2][1].value === field) || 
          (b[0][2].value === field && b[1][2].value === field && b[2][2].value === field) || 
          (b[0][0].value === field && b[1][1].value === field && b[2][2].value === field)) {
        alert(message);
      }
    }

    $scope.move = function(cell) {
      if (cell.value === '') {
        cell.value = $scope.currentFieldType;
      } else {
        alert("This field is already occupied. Sorry, you have missed your turn");
      }
      $scope.checkForWinner($scope.currentFieldType, "Congratulations - " + $scope.currentFieldType +" won!");
      $scope.togglePlayer();
      if ($scope.computer) {
        $scope.computerMove();      
      }
    }

  }]);

  app.directive('ticTacToe', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/ticTacToe.html',
      controller: 'gameController',
      controllerAs: 'gameCtrl'
    };
  });
})();

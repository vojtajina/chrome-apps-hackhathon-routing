m.controller('App', function($scope, history) {
  $scope.history = history;
});

m.controller('Detail', function($scope, $routeParams) {
  $scope.id = $routeParams.id;
});

m.controller('List', function($scope) {
  $scope.items = ['something', 'nothing', 'anything', 'whatever'];
});

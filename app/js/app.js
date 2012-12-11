var m = angular.module('hackhathon', []);


m.config(function($routeProvider) {
  $routeProvider
      .when('/list', {templateUrl: 'tpl/list.html', controller: 'List'})
      .when('/detail', {templateUrl: 'tpl/detail.html', controller: 'Detail'});
});

var historyItems = [];

m.run(function(storage, $location, $rootScope) {
  var lastSyncedUrl;
  storage.get('location', function(url) {
    // restore initial url from local storage
    lastSyncedUrl = url || '/list';
    $location.url(lastSyncedUrl);

    // when url changes, save to local storage
    $rootScope.$watch(function() {return $location.url();}, function(url) {
      if (url !== lastSyncedUrl) {
        storage.set('location', url);
        historyItems.push(url);
      }
    });
  });
});


// hack to disable history API
// TODO(vojta): remove once this gets fixed
m.config(function($provide) {
  $provide.decorator('$sniffer', function($delegate) {
    $delegate.history = false;
    return $delegate;
  });
});


m.service('history', function($rootScope, $location) {
  var items = [];
  var pointer = -1;
  var lastUrl;

  $rootScope.$watch(function() {return $location.url();}, function(url) {
    if (url === lastUrl) return;

    lastUrl = url;
    if (items.length > pointer + 1) {
      items = items.slice(0, pointer + 1);
    }
    pointer = items.push(url) - 1;
  });

  this.back = function() {
    if (!items[pointer - 1]) return;

    pointer--;
    lastUrl = items[pointer];
    $location.url(items[pointer]);
  };

  this.forward = function() {
    if (!items[pointer + 1]) return;

    pointer++;
    lastUrl = items[pointer];
    $location.url(items[pointer]);
  };
});

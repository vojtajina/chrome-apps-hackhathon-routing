m.value('chromeStorage', chrome.storage.local);

m.service('storage', function($rootScope, chromeStorage) {
  this.get = function(key, done) {
    chromeStorage.get(key, function(data) {
      $rootScope.$apply(function() {
        done(data[key]);
      });
    });
  };

  this.set = function(key, value, done) {
    var data = {};
    data[key] = value;

    chromeStorage.set(data, function() {
      if (done) {
        $rootScope.$apply(done);
      }
    });
  };
});

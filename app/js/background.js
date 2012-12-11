chrome.app.runtime.onLaunched.addListener(function (launchData) {
  var options = {
    frame: 'frame',
    minWidth: 600,
    minHeight: 400,
    width: 600,
    height: 600,
    left: 0,
    top: 0
  };

  chrome.app.window.create('index.html', options, function (win) {});
});

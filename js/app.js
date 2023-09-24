"use strict";

(function () {
  function init() {
    var router = new Router([
      new Route("main", "main.html"),
      new Route("test_1", "test_1.html"),
      new Route("test_2", "test_2.html"),
      new Route("test_3", "test_3.html"),
    ]);
  }
  init();
})();

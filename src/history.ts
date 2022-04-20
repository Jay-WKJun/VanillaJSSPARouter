var _wr = function<
  T extends keyof typeof History.prototype,
  P extends Parameters<History[T]>
>(type: T) {
  var orig = history[type];
  return function(...parameters: P) {
      orig.apply(this, parameters);
      var e = new Event(type);
      // @ts-ignore
      e.arguments = arguments;
      window.dispatchEvent(e);
  };
};

history.pushState = _wr('pushState');

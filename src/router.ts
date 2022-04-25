// 싱글톤 객체로 관리한다.
// 아주 하나의 라이브러리로서 낼 수 있도록 단단하게 응집시켜놓기
type Component = () => Element;

class Router {
  rootElement: HTMLElement;
  router: { [key: string]: Component } = {};

  setRootElement(rootElementId: string) {
    this.rootElement = document.getElementById(rootElementId);
  }

  constructor() {
    window.history.pushState = this.createEventTriggerFunction('pushState');
    window.addEventListener('load', this.move);
    window.addEventListener('pushState', this.move);
    window.addEventListener('popstate', this.move);
  }

  private createEventTriggerFunction<
    T extends keyof typeof History.prototype,
    P extends Parameters<History[T]>
  >(type: T) {
    const orig = history[type];

    return function(...parameters: P) {
        orig.apply(this, parameters);
        const e = new Event(type);
        // @ts-ignore
        e.arguments = arguments;
        window.dispatchEvent(e);
    };
  };

  private move = () => {
    const currentPath = window.location.pathname;
    const currentPage = this.router[currentPath];
    this.rootElement.innerHTML = '';

    if (currentPage) {
      this.rootElement.appendChild(currentPage());
    } else {
      this.rootElement.appendChild(this.router[404]());
    }
  }

  // 라우트 등록
  set = (route: string, js: Component) => {
    this.router[route] = js;
  }

  // 라우터 이동
  push = (route: string) => {
    window.history.pushState({ route }, '', route);
    this.move();
  }

  // 라우터가 없는 경우
  setException = (js: Component) => {
    this.router[404] = js;
  }
}

export default new Router();

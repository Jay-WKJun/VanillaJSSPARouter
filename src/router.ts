// 싱글톤 객체로 관리한다.
// 아주 하나의 라이브러리로서 낼 수 있도록 단단하게 응집시켜놓기
type Component = () => Element;

class Router {
  rootElement: HTMLElement;
  router: { [key: string]: Component } = {};
  query: {
    param: {
      [dynamicPath: string]: string
    }
  } = { param: {} };

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
    // 여기서 currentPage를 읽기 전에 dynamic인지 아닌지 판단해야한다.
    // 만약 dynamic이라면, pathname에서 :id위치의 값을 추출해서 param에 저장하고 :id로 변환해서 줘야한다.
    const currentPathSplit: string[] = currentPath.split('/');
    const routerPaths = Object.keys(this.router);
    let isEqual = true;
    let targetPage: () => Element | null = null;
    const mapper: { [paramKey: string]: string } = {};
    for (let i = 0; i < routerPaths.length; i++) {
      const routerPath = routerPaths[i];
      isEqual = true;

      // 그냥 정확히 일치하면 끝
      if (routerPath === currentPath) {
        targetPage = this.router[routerPath];
        break;
      }

      const ithRouterSplit = routerPath.split('/');

      // 애초에 /로 나눈 길이가 안맞으면 그냥 넘겨야 한다.
      if (ithRouterSplit.length !== currentPathSplit.length) continue;

      for (let j = 0; j < currentPathSplit.length; j++) {
        let ithRouterWord = ithRouterSplit[j];
        const currentPathWord = currentPathSplit[j];

        // 현 라우터와 등록된 라우터의 주소 위치가 정확히 일치해야한다.
        if (currentPathSplit[j] !== ithRouterSplit[j]) {
          // :로 시작되는 단어인 경우
          if (/(^:\w*)/.test(ithRouterWord)) {
            // 맞는 경우 dynamic 변수에 해당하는 곳이므로 mapping 필요
            const paramKey = ithRouterWord.replace(':', '');
            mapper[paramKey] = currentPathWord;
            ithRouterWord = currentPathWord;
            continue;
          }

          isEqual = false;
          break;
        }
      }

      if (isEqual) {
        targetPage = this.router[routerPath];
        break;
      }
    }

    // routerPath를 모두 돌면서 pathArr을 모두 일치시키는 건... 나중에 router가 많아지면 힘들어질 것 같다.
    // 하지만 routerPath를 찾기 위해 돌지 않으면 안된다.

    if (targetPage) {
      this.rootElement.innerHTML = '';
      this.rootElement.appendChild(targetPage());

      if (mapper) this.query.param = mapper;
      else this.query.param = {};
    } else {
      this.rootElement.appendChild(this.router[404]());
      this.query.param = {};
    }
  }

  // 라우트 등록
  set = (route: string, js: Component) => {
    // 다이나믹 라우트,,, 법칙, :{id} id는 Key값이고 그 뒤의 값을 param으로 제공해야한다.
    // set은 그냥 그대로 하면 됨
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

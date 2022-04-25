// 싱글톤 객체로 관리한다.
// 단단하게 router 관련 모든 로직과 데이터를 응집하는 것이 목표
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

  private findPath = (currentPath: string, routerPaths: string[]) => {
    // 만약 dynamic이라면, pathname에서 :id위치의 값을 추출해서 param에 저장하고 :id로 변환해서 줘야한다.
    // dynamic의 기준은 ":"
    const currentPathSplit: string[] = currentPath.split('/');
    let isEqual = true;
    let targetPath: () => Element | null = null;
    const mapper: { [paramKey: string]: string } = {};
    for (let i = 0; i < routerPaths.length; i++) {
      const routerPath = routerPaths[i];
      const ithRouterSplit = routerPath.split('/');

      // 그냥 정확히 일치하면 끝
      if (routerPath === currentPath) {
        targetPath = this.router[routerPath];
        break;
      }

      // 애초에 /로 나눈 길이가 안맞으면 그냥 넘겨야 한다.
      if (ithRouterSplit.length !== currentPathSplit.length) continue;

      isEqual = true;
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
        targetPath = this.router[routerPath];
        break;
      }
    }

    return {
      targetPath,
      mapper,
    }
  }

  private move = () => {
    const currentPath = window.location.pathname;
    const routerPaths = Object.keys(this.router);

    const { targetPath, mapper } = this.findPath(currentPath, routerPaths);

    if (targetPath) {
      this.rootElement.innerHTML = '';
      this.rootElement.appendChild(targetPath());

      if (mapper) this.query.param = mapper;
      else this.query.param = {};
    } else {
      this.rootElement.appendChild(this.router[404]());
      this.query.param = {};
    }
  }

  // 라우트 등록
  set = (route: string, js: Component) => {
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

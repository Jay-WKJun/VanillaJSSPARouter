import './history';
import router from './router';

const root = document.getElementById('root');

window.addEventListener('load', () => {
  const currentPath = window.location.pathname;
  const currentPage = router[currentPath];
  root.innerHTML = '';
  root.appendChild(currentPage());
});

window.addEventListener('pushState', () => {
  const currentPath = window.location.pathname;
  const currentPage = router[currentPath];
  root.innerHTML = '';
  root.appendChild(currentPage());
});

window.addEventListener('popstate', () => {
  const currentPath = window.location.pathname;
  const currentPage = router[currentPath];
  root.innerHTML = '';
  root.appendChild(currentPage());
});

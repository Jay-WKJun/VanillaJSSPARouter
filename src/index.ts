import './history';
import router from './router';
console.log(router)

const root = document.getElementById('root');

const topDiv = document.createElement('div');

const button1 = document.createElement('button');
button1.addEventListener('click', () => {
  window.history.pushState({ route: 's' }, null, '/asdf');
});
button1.innerText = 'asdf로 가기!!'

const button2 = document.createElement('button');
button2.addEventListener('click', () => {
  window.history.pushState({ route: 'zxcv' }, null, '/qwer');
});
button2.innerText = 'qwer로 가기!!'

topDiv.appendChild(button1);
topDiv.appendChild(button2);

root.appendChild(topDiv);

window.addEventListener('pushState', () => {
  console.log('pop!!')
  const currentPath = window.location.pathname;
  console.log(currentPath);

  console.log(router[currentPath]);
});

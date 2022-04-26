import './home.css';
import router from '../router';

function Home() {
  const homeRootElement = document.createElement('div');
  homeRootElement.innerText = 'home page is here!!';

  const asdfButton = document.createElement('button');
  asdfButton.innerText = 'To Asdf!!';
  asdfButton.addEventListener('click', () => {
    router.push('/asdf');
  });

  const dynamicButton = document.createElement('button');
  dynamicButton.innerText = 'To Dynamic!!';
  dynamicButton.addEventListener('click', () => {
    router.push('/asdf/123');
  });

  const complicateButton = document.createElement('button');
  complicateButton.innerText = 'To Complicate!!';
  complicateButton.addEventListener('click', () => {
    router.push('/complicate/hhie/something/5678');
  });

  const queryStringButton = document.createElement('button');
  queryStringButton.innerText = 'To QueryString!!';
  queryStringButton.addEventListener('click', () => {
    router.push('/querystring/hahaha/something?somet=123&phone=01033333333&string=agile');
  });

  const colorTestDiv = document.createElement('div');
  colorTestDiv.className = 'color';
  colorTestDiv.innerText = "It's color Test Div!!!!";

  homeRootElement.appendChild(asdfButton);
  homeRootElement.appendChild(dynamicButton);
  homeRootElement.appendChild(complicateButton);
  homeRootElement.appendChild(queryStringButton);
  homeRootElement.appendChild(colorTestDiv);

  return homeRootElement;
}

export default Home;

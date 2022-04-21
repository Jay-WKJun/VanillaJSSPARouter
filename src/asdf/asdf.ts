import './asdf.css';

function Asdf() {
  const asdfRootElement = document.createElement('div');
  asdfRootElement.innerText = 'asdf page is here!!';

  const homeButton = document.createElement('button');
  homeButton.innerText = 'To Home!!';
  homeButton.addEventListener('click', () => {
    window.history.pushState({ root: '/' }, null, '/');
  });

  const colorTestDiv = document.createElement('div');
  colorTestDiv.className = 'asdf';
  colorTestDiv.innerText = "It's color Test Div!!!!";

  asdfRootElement.appendChild(homeButton);
  asdfRootElement.appendChild(colorTestDiv);

  return asdfRootElement;
}

export default Asdf;

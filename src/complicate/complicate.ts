import router from '../router';

function Home() {
  console.log(router.query)
  const homeRootElement = document.createElement('div');
  homeRootElement.innerText = 'home page is here!!';

  const asdfButton = document.createElement('button');
  asdfButton.innerText = 'To Asdf!!';
  asdfButton.addEventListener('click', () => {
    router.push('/');
  });

  const colorTestDiv = document.createElement('div');
  colorTestDiv.className = 'color';
  colorTestDiv.innerText = "It's color Test Div!!!!";

  homeRootElement.appendChild(asdfButton);
  homeRootElement.appendChild(colorTestDiv);

  return homeRootElement;
}

export default Home;

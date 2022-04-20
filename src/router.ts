import home from './home/home';
console.log(home)
const route: { [key: string]: any } = {
  '/': home,
  '/asdf': home,
};

export default route;

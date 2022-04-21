import home from './home/home';
import asdf from './asdf/asdf';

const route: { [key: string]: any } = {
  '/': home,
  '/asdf': asdf,
};

export default route;

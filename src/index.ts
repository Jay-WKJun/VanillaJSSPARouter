import Router from './router';
import Home from './home/home';
import Asdf from './asdf/asdf';

Router.setRootElement('root');
Router.set('/', Home);
Router.set('/asdf', Asdf);

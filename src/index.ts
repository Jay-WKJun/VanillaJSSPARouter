import Router from './router';
import Home from './home/home';
import Asdf from './asdf/asdf';
import Dynamic from './dynamic/dynamic';
import Complicate from './complicate/complicate';

Router.setRootElement('root');
Router.set('/', Home);
Router.set('/asdf', Asdf);
Router.set('/asdf/:id', Dynamic);
Router.set('/complicate/:id/something/:number', Complicate);

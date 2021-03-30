import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

//Imports
import './index.scss';
import Lista from './views/Lista'
import Detalles from './views/Detalles'
import NotFound from './views/NotFound'

//ServiceWorker
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Router>
    <Switch>
        <Route exact path="/" component={Lista}/>
        <Route exact path="/lista" component={Lista}/>
        <Route exact path="/branch/:branch" component={Detalles}/>
        <Route component={ NotFound } />
    </Switch>
</Router>, 
document.getElementById('root'));

serviceWorker.unregister();

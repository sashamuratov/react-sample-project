import './index.css';
import $ from 'jquery'; 

import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

import App from './components/App';
import Menu from './components/Menu';
import Repositories from './components/Repositories';
import Contributors from './components/Contributors';
import { configureStore , browserHistory } from './store/configureStore';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render(
<Provider store={store}>
	<App history={history}>
		<BrowserRouter history={history}>
			<Switch>
			    <Route exact path="/" component={Menu} />
				<Route path="/repositories/:username" component={Repositories} />
				<Route path="/contributors/:username/:repoId" component={Contributors} />
		    </Switch>
		</BrowserRouter>
	</App>
</Provider>,
  document.getElementById('root')
)
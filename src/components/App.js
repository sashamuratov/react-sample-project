import React from 'react';
import * as AppActions from '../actionCreators/App';
import { connect } from 'react-redux';
import { Link , Redirect } from 'react-router-dom';

import { getQueryVariable } from '../helpers/Functions';
import Config from '../config';

class App extends React.Component{

    componentWillMount() {
        const oauthCode = getQueryVariable(this.props.history.location.search, "code");
        if (!this.props.app.accessToken){
            if (oauthCode){
                AppActions.requestAccessToken(oauthCode);
            } else {
                window.location = Config.OAuth.url + this.props.history.location.pathname;   
            }
        }
    }

	render() {
        if (!this.props.app.accessToken)
            return false;

        const loaderTemplate = this.props.app.isLoading ? <div className="loader"></div> : false;
        const errorMessage = this.props.app.errorMessage;
        const errorMessageTemplate = errorMessage ? <div className="error">{errorMessage}</div> : false;

	    return (
	        <div className="menu">
                <div className="header">
                    <h1>Sample react project</h1>
                </div>
                <div>
                    { loaderTemplate }
                    { this.props.children }
                    { errorMessageTemplate }
                </div>
            </div>
	    );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
    }
}

export default connect(mapStateToProps)(App)
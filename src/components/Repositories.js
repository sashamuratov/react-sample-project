import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as AppActions from '../actionCreators/App';

class Repositories extends React.Component{

	componentDidMount() {
		const urlChunks = this.props.location.pathname.split("/");
		const username = urlChunks[urlChunks.length - 1];
		AppActions.fetchRepositories(username);
	}

	render() {

		const errorMessage = this.props.app.errorMessage;

		let noDataTemplate = false;
        if (!this.props.app.isLoading && this.props.app.repositories.length == 0 && !errorMessage)
            noDataTemplate = <div>No repos</div>;

	    return (
	        <div className="repositories">
	        	{ noDataTemplate }
                { this.props.app.repositories.map((item,index) => {
                	return (
                		<Link key={item.id} to={"/contributors/" + this.props.app.username + "/" + item.name}>{item.name}</Link>
            		);
                }) }
                <Link to="/">Back to menu</Link>
            </div>
	    );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
    }
}

export default connect(mapStateToProps)(Repositories)
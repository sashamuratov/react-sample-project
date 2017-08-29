import React from 'react';
import * as AppActions from '../actionCreators/App';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Menu extends React.Component{

	render() {
        if (!this.props.app.accessToken)
            return false;

        let loggedUserReposTemplate = false;
        if (this.props.app.loggedUserRepositories.length > 0){
            loggedUserReposTemplate = <div>
                <h3>Logged User Repos</h3>
                { this.props.app.loggedUserRepositories.map((item,index) => {
                    return (
                        <Link key={item.id} to={"/contributors/" + item.full_name}>{item.name}</Link>
                    );
                }) }
            </div>
        }

	    return (
            <div>
                { loggedUserReposTemplate }
                <input onChange={e => { AppActions.setSearchTerm(e.target.value); } } type="text" placeholder="Enter username" />
                <Link to={"/repositories/"+this.props.app.searchTerm} className={this.props.app.searchTerm == "" ? "hidden" : ""}>
                    <div className="button">Search</div>
                </Link>
            </div>
	    );
    }
}

function mapStateToProps(state) {
    return {
        app: state.app,
    }
}

export default connect(mapStateToProps)(Menu)
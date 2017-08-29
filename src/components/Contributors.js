import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as AppActions from '../actionCreators/App';

class Contributors extends React.Component{

    componentDidMount() {
        const urlChunks = this.props.location.pathname.split("/");
        const repo = urlChunks[urlChunks.length - 1];
        const username = urlChunks[urlChunks.length - 2];
        AppActions.fetchContributors(username, repo);
    }


    componentDidUpdate(prevProps, prevState){
        if (prevProps.username != this.props.username)
            this.getContributors();
    }

	render() {
        console.log(this.props.app);
        const errorMessage = this.props.app.errorMessage;

        let noDataTemplate = false;
        if (!this.props.app.isLoading && this.props.app.contributors.length == 0 && !errorMessage)
            noDataTemplate = <div>No contributors</div>;

	    return (
            <div className="contributors">
                { noDataTemplate }
                { this.props.app.contributors.map((item,index) => {
                    return (
                        <Link key={index} to={"/repositories/"+item.login}>{item.login}</Link>
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

export default connect(mapStateToProps)(Contributors)